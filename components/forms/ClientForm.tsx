'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/convex/_generated/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ImageUpload from './components/ImageUpload'
import { useUser } from '@clerk/clerk-react'
import { ca } from 'zod/v4/locales'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Client name must be at least 2 characters.'
  }),
  url: z.url({ message: 'Client URL must be a valid URL.' }),
  image: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'image/svg+xml',
          'image/gif'
        ].includes(file.type),
      { message: 'Invalid image file type' }
    ),
  active: z.boolean()
})

export default function ClientForm() {
  const generateUploadUrl = useMutation(api.images.generateUploadUrl)
  const createClient = useMutation(api.clients.createClient)

  const { user } = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
      image: undefined as unknown as File,
      active: false
    }
  })

  console.log('user', user?.username)

  const image = form.watch('image')

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    // createClient({
    //   name: values.name,
    //   url: values.url,
    //   active: values.active
    // })
    try {
      const postUrl = await generateUploadUrl()
      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': image!.type },
        body: image
      })
      const { storageId } = await result.json()

      await createClient({
        name: values.name,
        url: values.url,
        image: {
          storageId,
          author: user?.username || 'unknown',
          format: 'image'
        },
        active: values.active
      })

      form.reset()
      form.setValue('image', undefined as unknown as File)
    } catch (error) {
      console.error('Error creating client:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client URL</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <ImageUpload />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-sm font-normal">Active</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
              </FormItem>
            )
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { ImagePlus } from 'lucide-react'

export default function ImageUpload() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('')
  const { control, setValue, clearErrors, resetField, handleSubmit } =
    useFormContext()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader()
      try {
        reader.onload = () => setPreview(reader.result)
        reader.readAsDataURL(acceptedFiles[0])
        setValue('image', acceptedFiles[0])
        clearErrors('image')
      } catch {
        setPreview(null)
        resetField('image')
      }
    },
    [clearErrors, resetField, setValue]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] }
    })

  useEffect(() => {
    if (preview) {
      setPreview('')
    }
  }, [handleSubmit, preview])

  return (
    <FormField
      control={control}
      name="image"
      render={() => (
        <FormItem className="">
          <FormLabel
            className={`${fileRejections.length !== 0 && 'text-destructive'}`}
          >
            Image
          </FormLabel>
          <FormControl>
            <div
              {...getRootProps()}
              className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
            >
              {preview && (
                <img
                  src={preview as string}
                  alt="Uploaded image"
                  className="max-h-[400px] rounded-lg"
                />
              )}
              <ImagePlus
                className={`size-10 ${preview ? 'hidden' : 'block'}`}
              />
              <Input {...getInputProps()} type="file" />
              {isDragActive ? (
                <p>Drop the image!</p>
              ) : (
                <p>Click here or drag an image to upload it</p>
              )}
            </div>
            {/* <Input type="file" /> */}
          </FormControl>
          <FormMessage>
            {fileRejections.length !== 0 && (
              <p>Image must be less than 1MB and of type png, jpg, or jpeg</p>
            )}
          </FormMessage>
        </FormItem>
      )}
    />
  )
}

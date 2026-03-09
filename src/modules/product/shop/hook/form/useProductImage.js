import {
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor
} from '@dnd-kit/core'
import axios from 'axios'
import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { toast } from 'react-toastify'
import { initMediaUploadBatchesAPI } from '~/api/media.api'
import buildFormData from '~/helpers/buildFormData'

export const useProductImages = ({ control, errors }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [activeId, setActiveId] = useState(null)

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'product_images'
  })

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5
      }
    })
  )

  const handleUploadImages = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    if (files.length + fields?.length > 9) {
      toast.warn('You can only upload up to 9 files.')
      return
    }

    const formData = buildFormData({ files })

    try {
      setIsUploading(true)

      const { status, resData } = await initMediaUploadBatchesAPI({
        payload: formData
      })

      if (status !== 200) throw new Error('Failed to upload image')

      const results = await Promise.all(
        files.map((file, i) => {
          const { uploadUrl, tmpKey } = resData[i]

          return axios
            .put(uploadUrl, file, {
              headers: { 'Content-Type': file.type }
            })
            .then(() => ({ file, tmpKey }))
        })
      )

      results.forEach(({ file, tmpKey }, index) => {
        append({
          previewUrl: URL.createObjectURL(file),
          tmpKey,
          url: null,
          order: index
        })
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImages = (index) => {
    remove(index)
  }

  const handleMoveImages = (fromIndex, toIndex) => {
    move(fromIndex, toIndex)
  }

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
    document.body.style.cursor = 'grabbing'
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)

    document.body.style.cursor = ''
    if (!over) return
    if (active.id === over.id) return

    const oldIndex = fields.findIndex((i) => i.id === active.id)
    const newIndex = fields.findIndex((i) => i.id === over.id)
    handleMoveImages(oldIndex, newIndex)
  }

  const errorMessage = errors?.product_images?.root?.message

  return {
    isUploading,
    activeId,
    sensors,
    errorMessage,
    fields,
    handleUploadImages,
    handleRemoveImages,
    handleDragStart,
    handleDragEnd
  }
}

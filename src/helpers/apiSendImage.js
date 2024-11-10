export const uploadImageToCloudinary = async (imageFile) => {
  const cloudName = 'dk9uazz44'
  const uploadPreset = 'upload_present_maketplace'

  const formData = new FormData()
  formData.append('file', imageFile)
  formData.append('upload_preset', uploadPreset)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData
    }
  )
  const data = await response.json()
  return data.url
}

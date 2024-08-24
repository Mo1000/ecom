import { ref } from 'vue'

export const useFetch = (
  url: string,
  options: RequestInit = {},
  responseFormat: 'JSON' | 'TEXT' | 'BLOB' | 'FORM_DATA' | 'ARRAY_BUFFER' = 'JSON'
) => {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(true)

  fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw Error('Could not fetch the data for that resource')
      }
      switch (responseFormat) {
        case 'JSON':
          return res.json()
        case 'TEXT':
          return res.text()
        case 'BLOB':
          return res.blob()
        case 'FORM_DATA':
          return res.formData()
        case 'ARRAY_BUFFER':
          return res.arrayBuffer()
      }
    })
    .then((res) => {
      data.value = res
    })
    .catch((err) => {
      error.value = err
    })
    .finally(() => {
      loading.value = false
    })
  return { data, error, loading }
}

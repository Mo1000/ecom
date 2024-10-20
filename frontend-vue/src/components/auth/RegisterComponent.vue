<template>
  <div class="flex justify-center"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { registerSchemaForm } from '@/utils/formValidator/yupSchema'
import type { RegisterModel } from '@/models/auth/register.model'
import { customsValidationMessages } from '@/utils/formValidator/customValidatorMessages'

type RegisterModelKey = keyof RegisterModel

const classInput = '!rounded-full'
const nameFields: Record<RegisterModelKey, RegisterModelKey> = {
  username: 'username',
  email: 'email',
  password: 'password',
  lastName: 'lastName',
  firstName: 'firstName',
  phone: 'phone',
  bio: 'bio',
  linkedin: 'linkedin',
  location: 'location',
  website: 'website',
  profilePhoto: 'profilePhoto',
  twitter: 'twitter',
  facebook: 'facebook',
  youtube: 'youtube',
  gender: 'gender',
  designation: 'designation'
}

const formHelpers = useForm<RegisterModel>({
  validationSchema: registerSchemaForm
})
const { errors, handleSubmit, defineField, values, setFieldError, isFieldTouched } = formHelpers

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})

const enableNextStep = (fieldOfStep: RegisterModelKey[], activateCallback: () => void) => {
  const isAnyFieldsNotTouched = fieldOfStep.some((field) => !isFieldTouched(field))
  if (isAnyFieldsNotTouched) {
    fieldOfStep.forEach((field) => {
      if (!values?.[field]) {
        setFieldError(field, customsValidationMessages.required)
      }
    })
  }

  if (
    fieldOfStep.every((field) => {
      const myValue = values?.[field]
      return myValue && myValue.length > 0 && !errors.value[field]
    })
  ) {
    activateCallback()
  }
}

const [email, emailAttrs] = defineField(nameFields.email)
const [password, passwordAttrs] = defineField(nameFields.password)
const [userName, userNameAttrs] = defineField(nameFields.username)
const [lastName, lastNameAttrs] = defineField(nameFields.lastName)
const [firstName, firstNameAttrs] = defineField(nameFields.firstName)
const [phone, phoneAttrs] = defineField(nameFields.phone)
const [bio, bioAttrs] = defineField(nameFields.bio)
const [linkedin, linkedinAttrs] = defineField(nameFields.linkedin)
const [location, locationAttrs] = defineField(nameFields.location)
const [website, websiteAttrs] = defineField(nameFields.website)
const [profilePhoto, profilePhotoAttrs] = defineField(nameFields.profilePhoto)
const [twitter, twitterAttrs] = defineField(nameFields.twitter)
const [facebook, facebookAttrs] = defineField(nameFields.facebook)
const [youtube, youtubeAttrs] = defineField(nameFields.youtube)
const [designation, designationAttrs] = defineField(nameFields.designation)
const [gender, genderAttrs] = defineField(nameFields.gender)

const activeStep = ref(1)
</script>

<style lang="postcss">
.step-panel {
  background-color: transparent !important;
}
</style>

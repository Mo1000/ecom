<template>
  <div class="card flex justify-center">
    <Stepper v-model:value="activeStep" class="basis-[40rem]">
      <StepList>
        <Step v-slot="{ activateCallback, value, a11yAttrs }" :value="1" asChild>
          <div class="flex flex-row flex-auto gap-2" v-bind="a11yAttrs.root">
            <button
              class="bg-transparent border-0 inline-flex flex-col gap-2"
              v-bind="a11yAttrs.header"
              @click="activateCallback"
            >
              <span
                :class="[
                  'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                  {
                    'bg-primary text-primary-contrast border-primary': Number(value) <= activeStep,
                    'border-surface-200 dark:border-surface-700': Number(value) > activeStep
                  }
                ]"
              >
                <i class="pi pi-user" />
              </span>
            </button>
            <Divider />
          </div>
        </Step>
        <Step v-slot="{ activateCallback, value, a11yAttrs }" :value="2" asChild>
          <div class="flex flex-row flex-auto gap-2 pl-2" v-bind="a11yAttrs.root">
            <button
              class="bg-transparent border-0 inline-flex flex-col gap-2"
              v-bind="a11yAttrs.header"
              @click="activateCallback"
            >
              <span
                :class="[
                  'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                  {
                    'bg-primary text-primary-contrast border-primary': Number(value) <= activeStep,
                    'border-surface-200 dark:border-surface-700': Number(value) > activeStep
                  }
                ]"
              >
                <i class="pi pi-star" />
              </span>
            </button>
            <Divider />
          </div>
        </Step>
        <Step v-slot="{ activateCallback, value, a11yAttrs }" :value="3" asChild>
          <div class="flex flex-row pl-2" v-bind="a11yAttrs.root">
            <button
              class="bg-transparent border-0 inline-flex flex-col gap-2"
              v-bind="a11yAttrs.header"
              @click="activateCallback"
            >
              <span
                :class="[
                  'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                  {
                    'bg-primary text-primary-contrast border-primary': Number(value) <= activeStep,
                    'border-surface-200 dark:border-surface-700': Number(value) > activeStep
                  }
                ]"
              >
                <i class="pi pi-id-card" />
              </span>
            </button>
          </div>
        </Step>
      </StepList>
      <StepPanels>
        <form @submit="onSubmit">
          <StepPanel v-slot="{ activateCallback }" :value="1">
            <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 20rem">
              <div class="text-center mt-4 mb-4 text-xl font-semibold">Create your account</div>
              <div class="field">
                <InputText
                  :id="nameFields.userName"
                  v-model="userName"
                  :invalid="!!errors?.userName"
                  aria-autocomplete="both"
                  autocomplete="username"
                  fluid
                  placeholder="User Name"
                  type="text"
                  v-bind="userNameAttrs"
                />
                <ErrorMessageField v-if="errors?.userName" :error="errors?.userName" />
              </div>
              <div class="field">
                <InputText
                  :id="nameFields.firstName"
                  v-model="firstName"
                  :invalid="!!errors?.firstName"
                  autocomplete="given-name"
                  fluid
                  placeholder="First Name"
                  type="text"
                  v-bind="firstNameAttrs"
                />
                <ErrorMessageField v-if="errors?.firstName" :error="errors?.firstName" />
              </div>
              <div class="field">
                <InputText
                  :id="nameFields.lastName"
                  v-model="lastName"
                  :invalid="!!errors?.lastName"
                  autocomplete="family-name"
                  fluid
                  placeholder="Last Name"
                  type="text"
                  v-bind="lastNameAttrs"
                />
                <ErrorMessageField v-if="errors?.lastName" :error="errors?.lastName" />
              </div>

              <div class="flex pt-6 justify-end">
                <Button
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  label="Next"
                  @click="
                    enableNextStep(
                      [nameFields.userName, nameFields.firstName, nameFields.lastName],
                      () => activateCallback(2)
                    )
                  "
                />
              </div>
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" :value="2">
            <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 20rem">
              <div class="text-center mt-4 mb-4 text-xl font-semibold">
                Fill in your contact information
              </div>
              <div class="field">
                <InputText
                  :id="nameFields.phone"
                  v-model="phone"
                  :invalid="!!errors?.phone"
                  autocomplete="tel"
                  fluid
                  placeholder="Phone"
                  type="tel"
                  v-bind="phoneAttrs"
                />
                <ErrorMessageField v-if="errors?.phone" :error="errors?.phone" />
              </div>
              <div class="field">
                <InputText
                  :id="nameFields.email"
                  v-model="email"
                  :invalid="!!errors?.email"
                  autocomplete="email"
                  fluid
                  placeholder="Email"
                  type="email"
                  v-bind="emailAttrs"
                />
                <ErrorMessageField v-if="errors?.email" :error="errors?.email" />
              </div>
              <div class="field">
                <Password
                  :id="nameFields.password"
                  v-model="password"
                  :invalid="!!errors?.password"
                  autocomplete="new-password"
                  fluid
                  mediumRegex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                  placeholder="Password"
                  strongRegex='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$'
                  toggleMask
                  v-bind="passwordAttrs"
                >
                  <template #header>
                    <div class="font-semibold text-xm mb-4">Pick a password</div>
                  </template>
                  <template #footer>
                    <Divider />
                    <ul class="pl-2 ml-2 my-0 leading-normal">
                      <li>At least one lowercase</li>
                      <li>At least one uppercase</li>
                      <li>At least one numeric</li>
                      <li>At least special characters</li>
                      <li>Minimum 8 characters</li>
                    </ul>
                  </template>
                </Password>
                <ErrorMessageField v-if="errors?.password" :error="errors?.password" />
              </div>

              <div class="flex pt-6 justify-between">
                <Button
                  icon="pi pi-arrow-left"
                  label="Back"
                  severity="secondary"
                  type="button"
                  @click="activateCallback(1)"
                />
                <Button
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  label="Next"
                  type="submit"
                  @click="
                    enableNextStep([nameFields.phone, nameFields.email, nameFields.password], () =>
                      activateCallback(3)
                    )
                  "
                />
              </div>
            </div>
          </StepPanel>
          <StepPanel :value="3">
            <div
              class="flex flex-col gap-2 items-center mx-auto"
              style="min-height: 16rem; max-width: 24rem"
            >
              <div class="text-center mt-4 mb-4 text-xl font-semibold">
                Account created successfully
              </div>
              <div class="text-center">
                <img
                  alt="logo"
                  src="https://primefaces.org/cdn/primevue/images/stepper/content.svg"
                />
              </div>
            </div>
            <!--            <div class="flex pt-6 justify-start">-->
            <!--              <Button-->
            <!--                icon="pi pi-arrow-left"-->
            <!--                label="Back"-->
            <!--                severity="secondary"-->
            <!--                @click="activateCallback(2)"-->
            <!--              />-->
            <!--            </div>-->
          </StepPanel>
        </form>
      </StepPanels>
    </Stepper>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import ErrorMessageField from '@/components/ErrorMessageField.vue'
import { registerSchemaForm } from '@/utils/formValidator/yupSchema'
import type { RegisterModel } from '@/models/auth/register.model'
import { customsValidationMessages } from '@/utils/formValidator/customValidatorMessages'

type RegisterModelKey = keyof RegisterModel
const nameFields: Record<RegisterModelKey, RegisterModelKey> = {
  userName: 'userName',
  email: 'email',
  password: 'password',
  lastName: 'lastName',
  firstName: 'firstName',
  phone: 'phone'
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
const [userName, userNameAttrs] = defineField(nameFields.userName)
const [lastName, lastNameAttrs] = defineField(nameFields.lastName)
const [firstName, firstNameAttrs] = defineField(nameFields.firstName)
const [phone, phoneAttrs] = defineField(nameFields.phone)

const activeStep = ref(1)
</script>

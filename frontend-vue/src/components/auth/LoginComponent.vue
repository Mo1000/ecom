<template>
  <section>
    <form class="flex flex-col gap-5 w-[500px] items-center" @submit="onSubmit">
      <div class="field">
        <InputText
          :id="nameFields.email"
          v-model="email"
          :class="classInput"
          :invalid="!!errors?.email"
          aria-autocomplete="both"
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
          :class="classInput"
          :invalid="!!errors?.password"
          autocomplete="new-password"
          fluid
          placeholder="Password"
          toggleMask
          v-bind="passwordAttrs"
        >
          <!--          mediumRegex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"-->
          <!--          strongRegex='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$'-->
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
      <Button :class="classInput" label="Submit" type="submit" />
    </form>

    <div class="flex gap-5 mt-5">
      <Button :class="classInput" label="Login" @click="login" />
      <Button :class="classInput" label="Get Courses" @click="getCourses" />
      <Button :class="classInput" label="Create Role" @click="createRole" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import ErrorMessageField from '@/components/ErrorMessageField.vue'
import { loginSchemaForm } from '@/utils/formValidator/yupSchema'
import type { LoginModel } from '@/models/auth/login.model'
import CourseService from '@/services/course.service'
import Parse from '@/utils/parse/index'
import UserClass from '@/services/user.service'
import { AccountRoleEnum } from '@/enums/account-role.enum'

type LoginModelKey = keyof LoginModel

const classInput = '!rounded-full'
const nameFields: Record<LoginModelKey, LoginModelKey> = {
  email: 'email',
  password: 'password'
}

const formHelpers = useForm<LoginModel>({
  validationSchema: loginSchemaForm
})
const { errors, handleSubmit, defineField } = formHelpers

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = UserClass.signUp({
      email: values.email,
      password: values.password,
      username: values.email,
      roles: [AccountRoleEnum.INSTRUCTOR]
    })
    console.log(res)
  } catch (e) {
    console.log(e)
  }
})

const login = async () => {
  console.log('login')

  try {
    const res: UserClass = await Parse.Cloud.run('login', {
      email: 'amos6@gmail.com',
      password: 'amos'
    })
    await Parse.User.become(res.getSessionToken())
  } catch (e: any) {
    // If login fails, throw an error which will be caught in the calling function
    throw new Error(e.message)
  }
}
const getCourses = async () => {
  try {
    const a = await CourseService.getCourses()
    console.log(a)
  } catch (e) {
    console.log(e)
  }
}
const createRole = async () => {
  try {
    const a = await CourseService.createCourse({
      title: 'title'
    } as any)
    console.log(a)
    // await Parse.User.logOut()
  } catch (e) {
    console.log(e)
  }
}
const [email, emailAttrs] = defineField(nameFields.email)
const [password, passwordAttrs] = defineField(nameFields.password)
</script>

<style lang="postcss">
.step-panel {
  background-color: transparent !important;
}
</style>

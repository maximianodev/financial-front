import { SignInForm } from './form'

export default async function SignInPage() {
  return (
    <div className='w-full max-w-[600px] mx-auto p-8 mt-8'>
      <h1 className='text-5xl sm:text-7xl font-bold text-center mb-8'>Financeiro</h1>

      <SignInForm />
    </div>
  )
}

import { LoginForm } from './form'

export default async function LoginPage() {
  return (
    <div className='max-w-md mx-auto p-8'>
      <h1 className='text-2xl font-bold text-center mb-8'>Controle Financeiro</h1>

      <LoginForm />
    </div>
  )
}

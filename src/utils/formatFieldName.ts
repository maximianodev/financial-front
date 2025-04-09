export const formatFieldName = (name: string) => {
  switch (name) {
    case 'email':
      return 'E-mail'
    case 'password':
      return 'Senha'
    default:
      return name.charAt(0).toUpperCase() + name.slice(1)
  }
}

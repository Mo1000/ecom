export const customsValidationMessages = {
  required: 'Ce champ est requis',
  number: 'Ce champ doit être un nombre',
  url: 'Ce champ doit être une URL valide',
  atLeastOneLinkAvailable: 'Vous devez fournir au moins un lien',
  mustBeUrl: "Ce champ doit être une url. Ex: 'https://www.example.com ' ",
  invalidPhoneNumber: 'Le numéro de téléphone est invalide',
  dateEnd: 'Le jour de fin doit être supérieur ou égal au jour de début',
  endTimeSupStartTime:
    "L'heure de fin doit être supérieure à l'heure de début pour la même journée",
  endDateSupStartDate: 'Le jour de fin doit être supérieur au jour de début ',
  mustBeEmail: 'Ce champ doit être une adresse email valide'
}

export const filedWithAtLeast = (min: number) => {
  return `Ce champ doit contenir au moins ${min} caractères`
}

export const codeStrictLength = (length: number) => {
  return `Le code de réinitialisation possède ${length} chiffres`
}

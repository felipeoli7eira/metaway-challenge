export default function validateMobilePhone(phone: string): boolean {
    if (!phone) {
        return false
    }

    const cleanPhone = phone.replace(/\D/g, ""); // Remove tudo que não for número

    if (cleanPhone.length < 10) {
        return false
    }

    return true
  };

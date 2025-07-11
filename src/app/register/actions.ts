
'use server';

import * as z from 'zod';
import { addStudent, addManager, addOwner, isEmailInUse, isMessRegistrationNoValid } from '@/lib/db';

const baseSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  messName: z.string().min(2, { message: 'Mess name must be at least 2 characters.' }),
});

const studentSchema = baseSchema.extend({
  messRegistrationNo: z.string().min(1, { message: 'Mess registration number is required.' }),
});

const managerSchema = baseSchema.extend({
  messRegistrationNo: z.string().min(1, { message: 'Mess registration number is required.' }),
});

const ownerSchema = baseSchema;

export async function registerStudent(data: z.infer<typeof studentSchema>) {
  const validatedFields = studentSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, error: 'Invalid fields. Please check your input.' };
  }
  
  const { email, messRegistrationNo } = validatedFields.data;

  if (!isMessRegistrationNoValid(messRegistrationNo)) {
    return { success: false, error: 'Invalid Mess Registration No. Please check with your mess owner.' };
  }

  if (isEmailInUse(email)) {
    return { success: false, error: 'This email is already registered.' };
  }

  addStudent(validatedFields.data);
  console.log('Registering Student:', validatedFields.data);

  return { success: true, message: 'Student registered successfully! Please login.' };
}

export async function registerManager(data: z.infer<typeof managerSchema>) {
    const validatedFields = managerSchema.safeParse(data);

    if (!validatedFields.success) {
      return { success: false, error: 'Invalid fields. Please check your input.' };
    }

    const { email, messRegistrationNo } = validatedFields.data;

    if (!isMessRegistrationNoValid(messRegistrationNo)) {
        return { success: false, error: 'Invalid Mess Registration No. Please check with your mess owner.' };
    }

    if (isEmailInUse(validatedFields.data.email)) {
      return { success: false, error: 'This email is already registered.' };
    }

    addManager(validatedFields.data);
    console.log('Registering Manager:', validatedFields.data);

    return { success: true, message: 'Manager registered successfully! Please login.' };
}


export async function registerOwner(data: z.infer<typeof ownerSchema>) {
    const validatedFields = ownerSchema.safeParse(data);

    if (!validatedFields.success) {
      return { success: false, error: 'Invalid fields. Please check your input.' };
    }

    if (isEmailInUse(validatedFields.data.email)) {
      return { success: false, error: 'This email is already registered.' };
    }

    const { name, messName } = validatedFields.data;
    const ownerId = `${name.split(' ')[0].toUpperCase()}-00001`;
    const messRegistrationNo = `${messName.replace(/\s+/g, '').toUpperCase()}-00001`;

    const ownerData = {
        ...validatedFields.data,
        ownerId,
        messRegistrationNo,
    };
    
    addOwner(ownerData);
    console.log('Registering Owner:', ownerData);

    return {
      success: true,
      message: 'Owner account created! Please save these credentials.',
      data: {
        ownerId,
        messRegistrationNo,
      },
    };
}

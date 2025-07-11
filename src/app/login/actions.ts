
'use server';

import * as z from 'zod';
import { findStudentByEmail, findManagerByEmail, findOwnerById, isEmailInUse } from '@/lib/db';

const studentLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  messRegistrationNo: z.string().min(1, { message: 'Mess registration number is required.' }),
});

const managerLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  messRegistrationNo: z.string().min(1, { message: 'Mess registration number is required.' }),
});

const ownerLoginSchema = z.object({
  ownerId: z.string().min(1, { message: 'Owner ID is required.' }),
  messRegistrationNo: z.string().min(1, { message: 'Mess registration number is required.' }),
});

export async function loginStudent(data: z.infer<typeof studentLoginSchema>) {
    const validatedFields = studentLoginSchema.safeParse(data);

    if (!validatedFields.success) {
        return { success: false, error: 'Invalid fields. Please check your input.' };
    }

    const { email, messRegistrationNo } = validatedFields.data;
    const student = findStudentByEmail(email);

    if (!student) {
        // To prevent leaking information about which role an email is registered with,
        // we can give a generic error. Or a more specific one as requested.
        const otherRole = isEmailInUse(email, ['manager', 'owner']);
        if (otherRole) {
            return { success: false, error: `This email is registered as a ${otherRole}. Please use the correct login tab.` };
        }
        return { success: false, error: 'Invalid credentials. Please check your email and registration number.' };
    }

    if (student.messRegistrationNo.toLowerCase() !== messRegistrationNo.toLowerCase()) {
        return { success: false, error: 'Invalid credentials. Please check your email and registration number.' };
    }

    return { success: true, message: 'Login successful!', studentName: student.name };
}

export async function loginManager(data: z.infer<typeof managerLoginSchema>) {
    const validatedFields = managerLoginSchema.safeParse(data);

    if (!validatedFields.success) {
        return { success: false, error: 'Invalid fields. Please check your input.' };
    }

    const { email, messRegistrationNo } = validatedFields.data;
    const manager = findManagerByEmail(email);

    if (!manager) {
        const otherRole = isEmailInUse(email, ['student', 'owner']);
        if (otherRole) {
            return { success: false, error: `This email is registered as a ${otherRole}. Please use the correct login tab.` };
        }
        return { success: false, error: 'Invalid credentials. Please check your email and registration number.' };
    }

    if (manager.messRegistrationNo.toLowerCase() !== messRegistrationNo.toLowerCase()) {
        return { success: false, error: 'Invalid credentials. Please check your email and registration number.' };
    }

    return { success: true, message: 'Login successful!' };
}

export async function loginOwner(data: z.infer<typeof ownerLoginSchema>) {
    const validatedFields = ownerLoginSchema.safeParse(data);

    if (!validatedFields.success) {
        return { success: false, error: 'Invalid fields. Please check your input.' };
    }

    const { ownerId, messRegistrationNo } = validatedFields.data;
    const owner = findOwnerById(ownerId);

    if (!owner || owner.messRegistrationNo.toLowerCase() !== messRegistrationNo.toLowerCase()) {
        return { success: false, error: 'Invalid credentials. Please check your Owner ID and registration number.' };
    }

    return { success: true, message: 'Login successful!' };
}


import Database from 'better-sqlite3';

// Define interfaces for our data structures
interface User {
    name: string;
    phone: string;
    email: string;
    messName: string;
}

interface Student extends User {
    messRegistrationNo: string;
}

interface Manager extends User {
    messRegistrationNo: string;
}

interface Owner extends User {
    ownerId: string;
    messRegistrationNo: string;
}

// --- SQLite Database Setup ---
// In a serverless environment or during development with hot-reloading,
// it's crucial to avoid creating new database connections on every request.
// A common pattern is to store the connection on the global object.
interface GlobalWithDb {
  db: Database.Database;
}
const globalWithDb = global as unknown as GlobalWithDb;

let db: Database.Database;

if (process.env.NODE_ENV === 'production') {
  db = new Database('messmate.db');
} else {
  if (!globalWithDb.db) {
    globalWithDb.db = new Database('messmate.db');
  }
  db = globalWithDb.db;
}


// --- Create Tables if they don't exist ---
const createStudentTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    messName TEXT NOT NULL,
    messRegistrationNo TEXT NOT NULL
  )
`);

const createManagerTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS managers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    messName TEXT NOT NULL,
    messRegistrationNo TEXT NOT NULL
  )
`);

const createOwnerTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS owners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    messName TEXT NOT NULL,
    ownerId TEXT NOT NULL UNIQUE,
    messRegistrationNo TEXT NOT NULL UNIQUE
  )
`);

// Run table creation queries
db.transaction(() => {
  createStudentTable.run();
  createManagerTable.run();
  createOwnerTable.run();
})();

// --- "Database" insertion functions ---
export function addStudent(student: Student) {
    const stmt = db.prepare(
        'INSERT INTO students (name, phone, email, messName, messRegistrationNo) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(student.name, student.phone, student.email, student.messName, student.messRegistrationNo);
}

export function addManager(manager: Manager) {
    const stmt = db.prepare(
        'INSERT INTO managers (name, phone, email, messName, messRegistrationNo) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(manager.name, manager.phone, manager.email, manager.messName, manager.messRegistrationNo);
}

export function addOwner(owner: Owner) {
    const stmt = db.prepare(
        'INSERT INTO owners (name, phone, email, messName, ownerId, messRegistrationNo) VALUES (?, ?, ?, ?, ?, ?)'
    );
    stmt.run(owner.name, owner.phone, owner.email, owner.messName, owner.ownerId, owner.messRegistrationNo);
}

// --- "Database" query functions ---
export function findStudentByEmail(email: string): Student | undefined {
    const stmt = db.prepare('SELECT * FROM students WHERE lower(email) = lower(?)');
    const student = stmt.get(email) as Student | undefined;
    return student;
}

export function findManagerByEmail(email: string): Manager | undefined {
    const stmt = db.prepare('SELECT * FROM managers WHERE lower(email) = lower(?)');
    const manager = stmt.get(email) as Manager | undefined;
    return manager;
}

export function findOwnerByEmail(email: string): Owner | undefined {
    const stmt = db.prepare('SELECT * FROM owners WHERE lower(email) = lower(?)');
    const owner = stmt.get(email) as Owner | undefined;
    return owner;
}

export function findOwnerById(ownerId: string): Owner | undefined {
    const stmt = db.prepare('SELECT * FROM owners WHERE lower(ownerId) = lower(?)');
    const owner = stmt.get(ownerId) as Owner | undefined;
    return owner;
}

/**
 * Checks if a mess registration number is valid (i.e., exists in the owners table).
 * @param messRegistrationNo The mess registration number to check.
 * @returns true if the registration number is valid, otherwise false.
 */
export function isMessRegistrationNoValid(messRegistrationNo: string): boolean {
    const stmt = db.prepare('SELECT messRegistrationNo FROM owners WHERE lower(messRegistrationNo) = lower(?)');
    const owner = stmt.get(messRegistrationNo);
    return !!owner;
}

/**
 * Checks if an email is already used by any user type.
 * @param email The email to check.
 * @param rolesToExclude An array of roles to exclude from the check.
 * @returns The role name if the email is in use, otherwise null.
 */
export function isEmailInUse(email: string, rolesToExclude: ('student' | 'manager' | 'owner')[] = []): string | null {
    if (!rolesToExclude.includes('student')) {
        const studentStmt = db.prepare('SELECT email FROM students WHERE lower(email) = lower(?)');
        if (studentStmt.get(email)) return 'student';
    }
    if (!rolesToExclude.includes('manager')) {
        const managerStmt = db.prepare('SELECT email FROM managers WHERE lower(email) = lower(?)');
        if (managerStmt.get(email)) return 'manager';
    }
    if (!rolesToExclude.includes('owner')) {
        const ownerStmt = db.prepare('SELECT email FROM owners WHERE lower(email) = lower(?)');
        if (ownerStmt.get(email)) return 'owner';
    }
    return null;
}


/**
 * FOR DEVELOPMENT ONLY
 * Fetches all records from all tables.
 * @returns An object containing all students, managers, and owners.
 */
export function getAllTables() {
    const students = db.prepare('SELECT * FROM students').all();
    const managers = db.prepare('SELECT * FROM managers').all();
    const owners = db.prepare('SELECT * FROM owners').all();
    return { students, managers, owners };
}

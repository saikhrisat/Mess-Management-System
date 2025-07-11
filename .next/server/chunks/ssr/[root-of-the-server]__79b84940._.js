module.exports = {

"[externals]/better-sqlite3 [external] (better-sqlite3, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("better-sqlite3", () => require("better-sqlite3"));

module.exports = mod;
}}),
"[project]/src/lib/db.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addManager": (()=>addManager),
    "addOwner": (()=>addOwner),
    "addStudent": (()=>addStudent),
    "findManagerByEmail": (()=>findManagerByEmail),
    "findOwnerByEmail": (()=>findOwnerByEmail),
    "findOwnerById": (()=>findOwnerById),
    "findStudentByEmail": (()=>findStudentByEmail),
    "isEmailInUse": (()=>isEmailInUse)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs)");
;
const globalWithDb = global;
let db;
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if (!globalWithDb.db) {
        globalWithDb.db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__["default"]('messmate.db');
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
db.transaction(()=>{
    createStudentTable.run();
    createManagerTable.run();
    createOwnerTable.run();
})();
function addStudent(student) {
    const stmt = db.prepare('INSERT INTO students (name, phone, email, messName, messRegistrationNo) VALUES (?, ?, ?, ?, ?)');
    stmt.run(student.name, student.phone, student.email, student.messName, student.messRegistrationNo);
}
function addManager(manager) {
    const stmt = db.prepare('INSERT INTO managers (name, phone, email, messName, messRegistrationNo) VALUES (?, ?, ?, ?, ?)');
    stmt.run(manager.name, manager.phone, manager.email, manager.messName, manager.messRegistrationNo);
}
function addOwner(owner) {
    const stmt = db.prepare('INSERT INTO owners (name, phone, email, messName, ownerId, messRegistrationNo) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(owner.name, owner.phone, owner.email, owner.messName, owner.ownerId, owner.messRegistrationNo);
}
function findStudentByEmail(email) {
    const stmt = db.prepare('SELECT * FROM students WHERE lower(email) = lower(?)');
    const student = stmt.get(email);
    return student;
}
function findManagerByEmail(email) {
    const stmt = db.prepare('SELECT * FROM managers WHERE lower(email) = lower(?)');
    const manager = stmt.get(email);
    return manager;
}
function findOwnerByEmail(email) {
    const stmt = db.prepare('SELECT * FROM owners WHERE lower(email) = lower(?)');
    const owner = stmt.get(email);
    return owner;
}
function findOwnerById(ownerId) {
    const stmt = db.prepare('SELECT * FROM owners WHERE lower(ownerId) = lower(?)');
    const owner = stmt.get(ownerId);
    return owner;
}
function isEmailInUse(email, rolesToExclude = []) {
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
}}),
"[project]/src/app/register/actions.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"402f0c94de6ad324ed33a3c6e09141f20c6d95973a":"registerManager","40441ac4543654b04383aa576e498c4fb226837bac":"registerOwner","40c10d5a841429eaa2720044f0f10e936f524759d1":"registerStudent"},"",""] */ __turbopack_context__.s({
    "registerManager": (()=>registerManager),
    "registerOwner": (()=>registerOwner),
    "registerStudent": (()=>registerStudent)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/lib/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const baseSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["object"])({
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().min(2, {
        message: 'Name must be at least 2 characters.'
    }),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().min(10, {
        message: 'Please enter a valid phone number.'
    }),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().email({
        message: 'Please enter a valid email.'
    }),
    messName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().min(2, {
        message: 'Mess name must be at least 2 characters.'
    })
});
const studentSchema = baseSchema.extend({
    messRegistrationNo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().min(1, {
        message: 'Mess registration number is required.'
    })
});
const managerSchema = baseSchema.extend({
    messRegistrationNo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().min(1, {
        message: 'Mess registration number is required.'
    })
});
const ownerSchema = baseSchema;
async function registerStudent(data) {
    const validatedFields = studentSchema.safeParse(data);
    if (!validatedFields.success) {
        return {
            success: false,
            error: 'Invalid fields. Please check your input.'
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isEmailInUse"])(validatedFields.data.email)) {
        return {
            success: false,
            error: 'This email is already registered.'
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addStudent"])(validatedFields.data);
    console.log('Registering Student:', validatedFields.data);
    return {
        success: true,
        message: 'Student registered successfully! Please login.'
    };
}
async function registerManager(data) {
    const validatedFields = managerSchema.safeParse(data);
    if (!validatedFields.success) {
        return {
            success: false,
            error: 'Invalid fields. Please check your input.'
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isEmailInUse"])(validatedFields.data.email)) {
        return {
            success: false,
            error: 'This email is already registered.'
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addManager"])(validatedFields.data);
    console.log('Registering Manager:', validatedFields.data);
    return {
        success: true,
        message: 'Manager registered successfully! Please login.'
    };
}
async function registerOwner(data) {
    const validatedFields = ownerSchema.safeParse(data);
    if (!validatedFields.success) {
        return {
            success: false,
            error: 'Invalid fields. Please check your input.'
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isEmailInUse"])(validatedFields.data.email)) {
        return {
            success: false,
            error: 'This email is already registered.'
        };
    }
    const { name, messName } = validatedFields.data;
    const ownerId = `${name.split(' ')[0].toUpperCase()}-00001`;
    const messRegistrationNo = `${messName.replace(/\s+/g, '').toUpperCase()}-00001`;
    const ownerData = {
        ...validatedFields.data,
        ownerId,
        messRegistrationNo
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addOwner"])(ownerData);
    console.log('Registering Owner:', ownerData);
    return {
        success: true,
        message: 'Owner account created! Please save these credentials.',
        data: {
            ownerId,
            messRegistrationNo
        }
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    registerStudent,
    registerManager,
    registerOwner
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerStudent, "40c10d5a841429eaa2720044f0f10e936f524759d1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerManager, "402f0c94de6ad324ed33a3c6e09141f20c6d95973a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerOwner, "40441ac4543654b04383aa576e498c4fb226837bac", null);
}}),
"[project]/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/register/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/register/actions.ts [app-rsc] (ecmascript)");
;
;
;
}}),
"[project]/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/register/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/register/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/register/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/register/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "402f0c94de6ad324ed33a3c6e09141f20c6d95973a": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerManager"]),
    "40441ac4543654b04383aa576e498c4fb226837bac": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerOwner"]),
    "40c10d5a841429eaa2720044f0f10e936f524759d1": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerStudent"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/register/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/register/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/register/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "402f0c94de6ad324ed33a3c6e09141f20c6d95973a": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["402f0c94de6ad324ed33a3c6e09141f20c6d95973a"]),
    "40441ac4543654b04383aa576e498c4fb226837bac": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40441ac4543654b04383aa576e498c4fb226837bac"]),
    "40c10d5a841429eaa2720044f0f10e936f524759d1": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40c10d5a841429eaa2720044f0f10e936f524759d1"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/register/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$register$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/register/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/register/page.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/register/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/register/page.tsx <module evaluation>", "default");
}}),
"[project]/src/app/register/page.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/register/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/register/page.tsx", "default");
}}),
"[project]/src/app/register/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/register/page.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/app/register/page.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$register$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/register/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/register/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__79b84940._.js.map
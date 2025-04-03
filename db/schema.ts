import { relations } from "drizzle-orm";
import { jsonb, varchar, pgTable, uuid, boolean, pgEnum, primaryKey } from "drizzle-orm/pg-core";

export const DepartmentLanguage = pgEnum('DepartmentLanguage', ['TR', 'EN', 'TR_EN']);
export const Semester = pgEnum('Semester', ['SPRING', 'FALL']);
export const LessonType = pgEnum('LessonType', ['ELECTIVE', 'COMPULSORY']);
export const Degree = pgEnum('Degree', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'PREP']);
export const AcademicRank = pgEnum('AcademicRank', ['DR', 'ASSISTANT_PROFESSOR', 'ASSOCIATE_PROFESSOR', 'PROFESSOR', 'LECTURER', 'RESEARCHER', 'OTHER']);

export const instructor = pgTable("instructor", {
    id: uuid().primaryKey().defaultRandom().notNull().unique(),
    email: varchar().notNull(),
    avatar: varchar(),
    name: varchar().notNull(),
    surname: varchar().notNull(),
    tag: AcademicRank().notNull(),
});

export const unit = pgTable("unit", {
    id: uuid().primaryKey().defaultRandom().notNull().unique(),
    unitName: varchar("unit_name").notNull(),
    isFaculty: boolean("is_faculty").notNull(),
    isDepartment: boolean("is_department").default(false),
    isActive: boolean("is_active").default(true),
});

export const department = pgTable("department", {
    id: uuid().primaryKey().defaultRandom().notNull().unique(),
    unitId: uuid("unit_id").notNull().references(() => unit.id),
    departmentName: varchar("department_name").notNull(),
    language: DepartmentLanguage().default('TR'),
    isActive: boolean("is_active").default(true),
});

export const period = pgTable("period", {
    id: uuid().primaryKey().defaultRandom().notNull().unique(),
    period: jsonb("period").default({ S: false, YS: null, YE: null }).notNull(),
    semester: Semester().notNull()
});

export const lesson = pgTable("lesson", {
    id: uuid().primaryKey().defaultRandom().notNull().unique(),
    instructorId: uuid("instructor_id").notNull().references(() => instructor.id),
    lessonCode: varchar("lesson_code").notNull(),
    lessonName: varchar("lesson_name").notNull(),
    letterRange: jsonb("letter_range").default({
        AA: { end: 100, start: 90 },
        BA: { end: 90, start: 80 },
        BB: { end: 80, start: 75 },
        CB: { end: 75, start: 65 },
        CC: { end: 65, start: 60 },
        DC: { end: 60, start: 55 },
        DD: { end: 55, start: 50 },
        FF: { end: 50, start: 0 }
    }).notNull(),
    semester: Semester().notNull(),
    type: jsonb("type").default({ online: false, rector: false, optional: false, compulsory: false }).notNull(),
    creditSystem: jsonb("credit_system").default({ ects: 6, credit: 3 }).notNull(),
    gradeWeight: jsonb("grade_weight").default({ visa: 40, final: 60 }).notNull(),
    degree: Degree().notNull(),
});

export const note = pgTable("note", {
    id: uuid().primaryKey().defaultRandom().notNull().unique(),
    userId: uuid("user_id").notNull(),
    lessonId: uuid("lesson_id").notNull().references(() => lesson.id),
    exam: jsonb().default({ visa: [{ M: false, O: null, P: false, S: false, U: null, MP: false, PD: null, MPD: null }], final: [{ M: false, O: null, P: false, S: false, U: null, MP: false, PD: null, MPD: null }], result: [{ N: null, LG: null} ], remedial: [ { P: false, S: null, PD: null } ] }).notNull(),
    exempted: boolean().default(false),
    isConcluded: boolean("is_concluded").default(false),
});

export const noteToPeriod = pgTable('note_to_period', {
    noteId: uuid('note_id').notNull().references(() => note.id),
    periodId: uuid('period_id').notNull().references(() => period.id)
    },
    (t) => [ primaryKey({ columns: [t.noteId, t.periodId] }) ]
);

export const instructorRelations = relations(instructor, ({ many }) => ({
    lesson: many(lesson),
}));

export const unitRelations = relations(unit, ({ many }) => ({
    department: many(department),
}));

export const departmentRelations = relations(department, ({ one }) => ({
    unit: one(unit, { fields: [department.unitId], references: [unit.id] })
}));

export const lessonRelations = relations(lesson, ({ one, many }) => ({
    note: many(note),
    instructor: one(instructor, { fields: [lesson.instructorId], references: [instructor.id] }),
}));

export const noteRelations = relations(note, ({ one, many }) => ({
    lesson: one(lesson, { fields: [note.lessonId], references: [lesson.id] }),
    noteToPeriod: many(noteToPeriod)
}));

export const periodRelations = relations(period, ({ many }) => ({
    noteToPeriod: many(noteToPeriod),
}));

export const noteToPeriodRelations = relations(noteToPeriod, ({ one }) => ({
    note: one(note, { fields: [noteToPeriod.noteId], references: [note.id] }),
    period: one(period, { fields: [noteToPeriod.periodId], references: [period.id] })
}));
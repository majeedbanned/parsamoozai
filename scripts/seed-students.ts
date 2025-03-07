const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const grades = ['7', '8', '9', '10', '11', '12'];

async function seedStudents() {
  try {
    // Generate 50 students
    const students = Array.from({ length: 50 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      fathername: faker.person.firstName(),
      grade: grades[Math.floor(Math.random() * grades.length)],
      status: Math.random() > 0.5 ? 'active' : 'inactive',
    }));

    // Insert all students
    const result = await prisma.student.createMany({
      data: students,
    });

    console.log(`Successfully added ${result.count} students to the database`);
  } catch (error) {
    console.error('Error seeding students:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedStudents(); 
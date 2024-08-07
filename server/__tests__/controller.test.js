const { test, expect } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
const { User, Task } = require("../models");
const { signToken } = require("../helpers/jwt");

let token;
let token2;
beforeAll(async () => {
  let user = await User.create({
    fullName: "user1",
    email: "user1@mail.com",
    password: "12345",
    gender: "female",
    phoneNumber: "0123456789",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  let user1 = await User.create({
    fullName: "user5",
    email: "user5@mail.com",
    password: "12345",
    gender: "male",
    phoneNumber: "0123456789",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  let task = await Task.create({
    title: "Eat more healthy food",
    task: "Veggies or smth",
    UserId: 1
  })
  token = signToken({
    id: user.id,
  });
  token2 = signToken({
    id: user1.id,
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await Task.destroy({ truncate: true, cascade: true, restartIdentity: true });
});

describe("endpoint post /user-login", () => {
  test("POST /login should return access token", async () => {
    let loginData = { email: "user1@mail.com", password: "12345" };
    let response = await request(app).post("/user-login").send(loginData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("POST /login should give error email required", async () => {
    let loginData = { email: "", password: "12345" };
    let response = await request(app).post("/user-login").send(loginData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("POST /login should give error password required", async () => {
    let loginData = { email: "user1@mail.com", password: "" };
    let response = await request(app).post("/user-login").send(loginData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  test("POST /login should give error email/password invalid", async () => {
    let loginData = { email: "a@gmail.com", password: "12345" };
    let response = await request(app).post("/user-login").send(loginData);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Email/Password Invalid");
  });

  test("POST /login should give error email/password invalid", async () => {
    let loginData = { email: "user1@mail.com", password: "12341" };
    let response = await request(app).post("/user-login").send(loginData);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Email/Password Invalid");
  });
});

describe("endpoint post /user-register", () => {
  test("POST /user-register should return object new user data", async () => {
    let user = {fullName: "riri", email: "riri@mail.com", password: "12345", gender: "female", phoneNumber: "12345678"}
    let response = await request(app).post('/user-register').send(user)
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('fullName', 'riri')
    expect(response.body).toHaveProperty('email', 'riri@mail.com')
  });

  test("POST /user-register should give error full name required", async () => {
    let user = {fullName: "", email: "reri@mail.com", password: "12345", gender: "female", phoneNumber: "12345678"}
    let response = await request(app).post('/user-register').send(user)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Full name is required");
  });

  test("POST /user-register should give error email required", async () => {
    let user = {fullName: "reri", email: "", password: "12345", gender: "female", phoneNumber: "12345678"}
    let response = await request(app).post('/user-register').send(user)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("POST /user-register should give error password required", async () => {
    let user = {fullName: "reri", email: "rari@mail.com", password: "", gender: "female", phoneNumber: "12345678"}
    let response = await request(app).post('/user-register').send(user)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  test("POST /user-register should give error gender required", async () => {
    let user = {fullName: "reri", email: "reri@mail.com", password: "12345", gender: "", phoneNumber: "12345678"}
    let response = await request(app).post('/user-register').send(user)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Gender is required");
  });

  test("POST /user-register should give error phone number required", async () => {
    let user = {fullName: "reri", email: "ruri@mail.com", password: "12345", gender: "female", phoneNumber: ""}
    let response = await request(app).post('/user-register').send(user)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Phone number is required");
  });
});

describe("endpoint put /user-update/:id", () => {
  test("PUT /user-update/1 should return updated user data", async () => {
    let updatedData = {fullName: "sam", email: "usersomething@mail.com", password: "12345", gender: "male", phoneNumber: "12345678"} 
    let response = await request(app).put('/user-update/1').send(updatedData).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty("message", "User riri successfully updated");
  })

  test("PUT /user-update/1 should return error full name required", async () => {
    let updatedData = {fullName: "", email: "usersomething@mail.com", password: "12345", gender: "male", phoneNumber: "12345678"} 
    let response = await request(app).put('/user-update/1').send(updatedData).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Full name is required");
  })  

  test("PUT /user-update/1 should return error email required", async () => {
    let updatedData = {fullName: "sam", email: "", password: "12345", gender: "male", phoneNumber: "12345678"} 
    let response = await request(app).put('/user-update/1').send(updatedData).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  }) 

  test("PUT /user-update/1 should return error password required", async () => {
    let updatedData = {fullName: "sam", email: "usersomething@gmail.com", password: "", gender: "male", phoneNumber: "12345678"} 
    let response = await request(app).put('/user-update/1').send(updatedData).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  }) 

  test("PUT /user-update/1 should return error gender required", async () => {
    let updatedData = {fullName: "sam", email: "usersomething@gmail.com", password: "12345", gender: "", phoneNumber: "12345678"} 
    let response = await request(app).put('/user-update/1').send(updatedData).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Gender is required");
  }) 

  test("PUT /user-update/1 should return error phone number required", async () => {
    let updatedData = {fullName: "sam", email: "usersomething@gmail.com", password: "12345", gender: "male", phoneNumber: ""} 
    let response = await request(app).put('/user-update/1').send(updatedData).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Phone number is required");
  }) 

  test("PUT /user-update/1 should return error data not found", async () => {
    let updatedData = {fullName: "sam", email: "usersomething@gmail.com", password: "12345", gender: "male", phoneNumber: ""} 
    let response = await request(app).put('/user-update/100').send(updatedData).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Data not found");
  }) 

  test("PUT /user-update/1 should return error invalid token", async () => {
    let updatedData = {fullName: "sam", email: "usersomething@gmail.com", password: "12345", gender: "male", phoneNumber: "12345678"} 
    let response = await request(app).put('/user-update/1').send(updatedData).set("Authorization", `Beare ${token}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  }) 

  test("PUT /user-update/1 should return error invalid token", async () => {
    let updatedData = {fullName: "sam", email: "usersomething@gmail.com", password: "12345", gender: "male", phoneNumber: "12345678"} 
    let response = await request(app).put('/user-update/1').send(updatedData).set("Authorization", `Bearer ${token2}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "You are forbidden to access this data");
  }) 
})

describe("endpoint post /task", () => {
  test("POST /task should return new task data", async () => {
    let data = {title: "Drink water", task: "2L everyday"}
    let response = await request(app).post('/task').send(data).set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
  })

  test("POST /task should return error title required", async () => {
    let data = {title: "", task: "2L everyday"}
    let response = await request(app).post('/task').send(data).set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message", "Title is required");
  })

  test("POST /task should return error invalid token", async () => {
    let data = {title: "Drink water", task: "2L everyday"}
    let response = await request(app).post('/task').send(data).set("Authorization", ` ${token}`)
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message", "Invalid Token");
  })
})

describe("endpoint get /task", () => {
  test("GET /task should return array of objects of tasks made", async () => {
    let response = await request(app).get('/task').set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  test("GET /task should return error invalid token", async () => {
    let response = await request(app).get('/task').set("Authorization", `${token}`)
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message", "Invalid Token");
  })
})

describe("endpoint get /task/:id", () => {
  test("GET /task/1 should return object", async () => {
    let response = await request(app).get('/task/1').set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object)
  })

  test("GET /task/100 should return error data not found", async () => {
    let response = await request(app).put('/task/100').set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Data not found");
  })

  test("GET /task/1 should return error invalid token", async () => {
    let response = await request(app).put('/task/1').set("Authorization", `${token}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  })
})

describe("endpoint put /task/:id", () => {
  test("PUT /task/1 should return updated task data", async () => {
    let data = {title: "Drink lemon water", task: "2L everyday"}
    let response = await request(app).put('/task/2').send(data).set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
  })

  test("PUT /task/1 should return error title required", async () => {
    let data = {title: "", task: "2L everyday"}
    let response = await request(app).put('/task/2').send(data).set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message", "Title is required");
  })

  test("PUT /task/1 should return error invalid token", async () => {
    let data = {title: "Drink water", task: "2L everyday"}
    let response = await request(app).put('/task/2').send(data).set("Authorization", ` ${token}`)
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message", "Invalid Token");
  })

  test("PUT /task/1 should return error not authorized", async () => {
    let data = {title: "Drink water", task: "2L everyday"}
    let response = await request(app).put('/task/2').send(data).set("Authorization", `Bearer ${token2}`)
    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty("message", "You are forbidden to access this data");
  })
})

describe("endpoint delete /task/:id", () => {
  test("DELETE /task/1 should return updated task data", async () => {
    let response = await request(app).delete('/task/2').set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
  })

  test("DELETE /task/1 should return error invalid token", async () => {
    let response = await request(app).delete('/task/2').set("Authorization", `${token}`)
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message", "Invalid Token");
  })
  
  test("DELETE /task/1 should return error not authorized", async () => {
    let data = {title: "Drink water", task: "2L everyday"}
    let response = await request(app).delete('/task/1').set("Authorization", `Bearer ${token2}`)
    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty("message", "You are forbidden to access this data");
  })
})
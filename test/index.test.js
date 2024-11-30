import request from 'supertest'

let token
const url = 'http://localhost:4000/'






describe('Post /auth/login', () => {
  test('to test the login api ', async () => {
    const res = await request(url).post('auth/login').send({ "email": "root@rot.com", "password": "root" })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    token = res.body.token
  })
})


describe('GET /event/getevent ', () => {
  test('To get events', async () => {
    const res = await request(url).get('events/getevents').auth(token, { type: "bearer" })
    // console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    res.body.forEach(element => {
      expect(element).toMatchSnapshot({
        _id: expect.any(String)
      })
    });
  })
})




describe('GET /event/getevent ', () => {
  test('To check weather it provides events without token', async () => {
    const res = await request(url).get('events/getevents')
    // console.log(res.body)
    expect(res.status).toBe(200)
    console.log(res.body)
    expect(res.body).toBeDefined()
    res.body.forEach(element => {
      expect(element).toMatchSnapshot({
        _id: expect.any(String)
      })
    });
  })
})




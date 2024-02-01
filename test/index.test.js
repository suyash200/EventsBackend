import request from 'supertest'

let token
const url = 'http://localhost:4000/'






test('Post /auth/login', async () => {
    const res = await request(url).post('auth/login').send({ "email": "root@rot.com", "password": "root" })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    token = res.body.token
})


test('Post /event/getevent', async () => {
    const res = await request(url).get('events/getevents').auth(token, { type: "bearer" })
    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    res.body.forEach(element => {
        expect(element).toMatchSnapshot({
            _id: expect.any(String)
        })
    });
})

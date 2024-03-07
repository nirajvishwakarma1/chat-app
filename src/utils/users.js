const users = []

const addUser = ({id, username = '', room = ''}) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find(user => {
        return user.room === room && user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = {id, username, room}
    users.push(user)
    return { user }
}

const removeUser = id => {
    try {
        if (!id) throw new Error('id is required to remove a user!')
        
        const index = users.findIndex(user => user.id === id)
        if (-1 === index) throw new Error('user not found!')

        return users.splice(index, 1)[0]
    } catch(error) {
        return {error}
    }
}

const getUser = (id = '') => users.find(user => user.id === id)

const getUsersInRoom = (room = '') => users.filter(user => user.room === `${room}`.toLocaleLowerCase())

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
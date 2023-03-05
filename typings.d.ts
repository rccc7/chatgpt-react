interface Message{
    text: string;
    createdAt: admin.firestotre.Timestamp;
    user:{
        _id: string;
        name: string;
        avatar: string;
    };
}
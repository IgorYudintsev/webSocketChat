import React, {ChangeEvent, RefObject, useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';


type dataType = {
    message: string
    photo: string
    userId: number
    userName: string
}

function App() {
    let messagesBlockRef: any = useRef()

    let [message, setMessage] = useState('');
    let [ws, setWs] = useState<any>(null);
    let [users, setUsers] = useState<Array<dataType>>([
        // {
        //     userId: 1,
        //     userName: 'Dima',
        //     photo: 'https://social-network.samuraijs.com/activecontent/images/users/13484/user-small.jpg?v=18',
        //     message: 'Hello Dima'
        // },
        // {
        //     userId: 1,
        //     userName: 'Sasha',
        //     photo: 'https://social-network.samuraijs.com/activecontent/images/users/13484/user-small.jpg?v=18',
        //     message: 'Hello Sasha'
        // }
    ])

    if (ws) {
        ws.onmessage = (messageEvent: any) => {
            console.log(messageEvent)
            //это строка->нужно ее распарсить
            let messages = JSON.parse(messageEvent.data)
            setUsers(messages)
            setUsers([...users, ...messages]);
            // @ts-ignore
            messagesBlockRef.current.scrollTo(0, messagesBlockRef.current.scrollHeight);//будет перематывать сообщения
        }

    }

    useEffect(() => {
        let localWS = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
        setWs(localWS)
    }, [])

    const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.currentTarget.value)
    }
    let sendMessage = () => {
        ws.send(message);
        setMessage('')
    }
    return (
        <div className="App">
            <div className={'chat'}>
                <div className={'messages'} ref={messagesBlockRef}>
                    <div className={'message'}>
                        {users.map((m, index) => {
                            return (
                                <div key={index}>
                                    <img src={m.photo}/>
                                    <span>{m.userName}</span>
                                    <span>{m.message}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={'footer'}>
                    <textarea onChange={onMessageChange} value={message}/>
                    {/*<textarea onChange={onMessageChange}>{message}</textarea>*/}
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default App;


//--------------------------------------------------1---------------------------------------------------
// import React, {ChangeEvent, useEffect, useState} from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//     let [message, setMessage] = useState('');
//     let [users, setUsers] = useState([
//         {id: 1, name: 'Dima', photo: 'https://via.placeholder.com/50C', message: 'Hello Dima'},
//         {id: 2, name: 'Sasha', photo: 'https://via.placeholder.com/50C', message: 'Hello Sasha'}
//     ])
//
//     let ws:any
//     useEffect(()=>{
//         ws=new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
//         ws.onmessage=(messageEvent:any)=>{
//             console.log(messageEvent)
//         }
//     },[])
//
//     const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
//         setMessage(event.currentTarget.value)
//     }
//     let sendMessage = () => {
//         ws.send(message)
//     }
//     return (
//         <div className="App">
//             <div className={'chat'}>
//                 <div className={'messages'}>
//                     <div className={'message'}>
//                         {users.map((m) => {
//                             return (
//                                 <div>
//                                     <img src={m.photo}/>
//                                     <span>{m.name}</span>
//                                     <span>{m.message}</span>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                     {/*<div className={'message'}>*/}
//                     {/*    <img src="https://via.placeholder.com/50C"/>*/}
//                     {/*    <span>Sasha</span>*/}
//                     {/*    <span>Hello Sasha</span>*/}
//                     {/*</div>*/}
//                 </div>
//                 <div className={'footer'}>
//                     <textarea onChange={onMessageChange}>{message}</textarea>
//                     {/*<input onChange={onMessageChange}/>*/}
//                     <button onClick={sendMessage}>Send</button>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default App;

/////////////////////////////////////////////////////////////2//////////////////////////////////////////////////////////////////////

// import React, {ChangeEvent, useEffect, useState} from 'react';
// import logo from './logo.svg';
// import './App.css';
//
//
// type dataType = {
//     message: string
//     photo: string
//     userId: number
//     userName: string
// }
//
// function App() {
//     let [message, setMessage] = useState('');
//     let [ws, setWs] = useState<any>(null);
//     let [users, setUsers] = useState<Array<dataType>>([
//         // {
//         //     userId: 1,
//         //     userName: 'Dima',
//         //     photo: 'https://social-network.samuraijs.com/activecontent/images/users/13484/user-small.jpg?v=18',
//         //     message: 'Hello Dima'
//         // },
//         // {
//         //     userId: 1,
//         //     userName: 'Sasha',
//         //     photo: 'https://social-network.samuraijs.com/activecontent/images/users/13484/user-small.jpg?v=18',
//         //     message: 'Hello Sasha'
//         // }
//     ])
//
//     if (ws) {
//         ws.onmessage = (messageEvent: any) => {
//             console.log(messageEvent)
//             //это строка->нужно ее распарсить
//             let messages = JSON.parse(messageEvent.data)
//             setUsers(messages)
//             setUsers([...users, ...messages])
//         }
//     }
//
//     useEffect(() => {
//         let localWS = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
//         setWs(localWS)
//     }, [])
//
//     const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
//         setMessage(event.currentTarget.value)
//     }
//     let sendMessage = () => {
//         ws.send(message)
//     }
//     return (
//         <div className="App">
//             <div className={'chat'}>
//                 <div className={'messages'}>
//                     <div className={'message'}>
//                         {users.map((m, index) => {
//                             return (
//                                 <div key={index}>
//                                     <img src={m.photo}/>
//                                     <span>{m.userName}</span>
//                                     <span>{m.message}</span>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 </div>
//                 <div className={'footer'}>
//                     <textarea onChange={onMessageChange}>{message}</textarea>
//                     <button onClick={sendMessage}>Send</button>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default App;


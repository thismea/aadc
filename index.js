import fetch from 'node-fetch'
import readlineSync from 'readline-sync';
import fsa from 'async-file'
import fs from 'fs'
import moment from 'moment'
import delay from 'delay'

const randstr = length => {
    var text = "";
    var possible =
        "1234567890";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

const randomshil = () => {
    const datanya = fs.readFileSync("./data/kata.txt", 'utf8')
    const array = datanya.toString().replace(/\r/g, "").split('\n')
    const result = array[Math.floor(Math.random() * array.length)]
    return result;
};

const getToken = (email, password) => new Promise((resolve, reject) => {
    fetch('https://discord.com/api/v9/auth/login', {
      method: 'POST',
      headers: {
        'Host': 'discord.com',
        'authorization': 'undefined',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        captcha_key: null,
        login: email,
        password: password,
        undelete: false,
        gift_code_sku_id: null,
    }),
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

const Channelmessage = (token, channelId, content) => new Promise((resolve, reject) => {
    fetch('https://discord.com/api/v9/channels/' + channelId + '/messages', {
      method: 'POST',
      headers: {
        'Host': 'discord.com',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 5.1; Trident/5.0)',
        'x-Super-Properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwOC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTA4LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL3NlYXJjaC55YWhvby5jb20vIiwicmVmZXJyaW5nX2RvbWFpbiI6InNlYXJjaC55YWhvby5jb20iLCJzZWFyY2hfZW5naW5lIjoieWFob28iLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTY4MTQ3LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==',
        'authorization': `${token}`,
        'accept-Language': 'id',
        'content-Type': 'application/json',
        'accept': '/',
        'urigin': 'https://discord.com',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Cookie': '__dcfduid=b0941a308f3811ed9d41d756173741b1; __sdcfduid=b0941a318f3811ed9d41d756173741b10284bb9bdefdd2e89a64664c4013c6f0aa22a2c43f874b60fb35b7c275dc1f0b; __cfruid=3c794fb8fa724fdf7a62398e5cdb6b6e6453d28a-1673965716'
      },
      body: JSON.stringify({
        content: content,
        nonce: randstr(18),
        tts: false
    }),
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

const removeMessage = (token, channelId, messageId) => {
    fetch('https://discord.com/api/v9/channels/' + channelId + '/messages/' + messageId, {
      method: 'DELETE',
      headers: {
        'Host': 'discord.com',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 5.1; Trident/5.0)',
        'x-Super-Properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwOC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTA4LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL3NlYXJjaC55YWhvby5jb20vIiwicmVmZXJyaW5nX2RvbWFpbiI6InNlYXJjaC55YWhvby5jb20iLCJzZWFyY2hfZW5naW5lIjoieWFob28iLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTY4MTQ3LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==',
        'authorization': `${token}`,
        'accept-Language': 'id',
        'content-Type': 'application/json',
        'accept': '/',
        'urigin': 'https://discord.com',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Cookie': '__dcfduid=b0941a308f3811ed9d41d756173741b1; __sdcfduid=b0941a318f3811ed9d41d756173741b10284bb9bdefdd2e89a64664c4013c6f0aa22a2c43f874b60fb35b7c275dc1f0b; __cfruid=3c794fb8fa724fdf7a62398e5cdb6b6e6453d28a-1673965716'
      }
    })
};

(async () => {
    try {
        console.log("\n")
        console.log("\x1b[33m \r\n\u2588\u2003 \u2003\u2584\u2580\u2588\u2003\u2588\u2584\u2591\u2588\u2003\u2588\u2580\u2580\u2003\u2588\u2580\u2580\u2003\u2588\u2580\u2580\u2003\u2588\u2580\u2588\u2003 \u2003\u2588\u2584\u2584\u2003\u2588\u2580\u2588\u2003\u2580\u2588\u2580\u2003\u2584\u2584\u2003\u2588\u2580\u2584\u2003\u2588\u2003\u2588\u2580\u2003\u2588\u2580\u2580\u2003\u2588\u2580\u2588\u2003\u2588\u2580\u2588\u2003\u2588\u2580\u2584\u2003 \u2003\u2588\r\n\u2584\u2003 \u2003\u2588\u2580\u2588\u2003\u2588\u2591\u2580\u2588\u2003\u2588\u2584\u2588\u2003\u2588\u2584\u2588\u2003\u2588\u2588\u2584\u2003\u2588\u2580\u2584\u2003 \u2003\u2588\u2584\u2588\u2003\u2588\u2584\u2588\u2003\u2591\u2588\u2591\u2003\u2591\u2591\u2003\u2588\u2584\u2580\u2003\u2588\u2003\u2584\u2588\u2003\u2588\u2584\u2584\u2003\u2588\u2584\u2588\u2003\u2588\u2580\u2584\u2003\u2588\u2584\u2580\u2003 \u2003\u2584 \x1b[0m")
        console.log("\n")
        console.log(`\x1b[33m Pilih Menu :\n1. Generate Authorization\n2. Otomatis BOT (Autochat + Autodelete)\n3. Otomatis BOT (Autochat Only)\n4. Manual BOT (Autochat + Autodelete)\n5. Manual BOT (Autochat Only)\n6. Exit\n\x1b[0m`)
        const choise = readlineSync.question('\x1b[33m [x] Masukan Pilihan Dengan Angka : \x1b[0m');
        if (choise === "1") {
            console.log("\x1b[33m \n// Get Token (Generate Authorization) //\x1b[0m")
            console.log("\x1b[33m [Info] Get token hanya bisa digunakan di IP lokal, karena mengharuskan login di browser dengan alamat IP yang sama terlebih dahulu untuk authentikasi!\nDan untuk pengguna vps kalian bisa generete terlebih dahulu menggunakan ip local, kemudian salin tokennya dan memasukkan kedalam file yang ada di /data/token.txt \x1b[0m")
            console.log("\x1b[33m \n[x] Silahkan Input Email & password Discord \x1b[0m")
            const email = readlineSync.question('\x1b[33m [+] Email: \x1b[0m');
            const password = readlineSync.question('\x1b[33m [+] Password: \x1b[0m');
            const ambiltoken = await getToken(email, password)
            if (ambiltoken.token) {
                console.log(`Token discord : ${ambiltoken.token}`)
                await fsa.writeTextFile("./data/token.txt", ambiltoken.token, "utf-8");
                console.log(`\x1b[44m Token berhasil di simpan di /data/token.txt \x1b[0m`)
            } else if (ambiltoken.captcha_key.includes('captcha-required')) {
                console.log("\x1b[44m Login ke browser terlebih dahulu \x1b[0m")
            } else {
                console.log("Kesalahan/Error")
            }
        } else if (choise === "2") {
            const token = fs.readFileSync('./data/token.txt', 'utf8');
            console.log("\x1b[33m \n// Otomatis BOT (with autodelete chat) // \x1b[0m")
            console.log(`\x1b[33m [x] Masukan ID channel atau nama file.txt \x1b[0m`)
            const channelId = readlineSync.question('\x1b[33m [x] Channel ID/file .txt : \x1b[0m');
            const delaychat = readlineSync.question('\x1b[33m [x] Masukan Delay (millisecond) : \x1b[0m');
            if (channelId.includes(".txt")) {
                if (!(await fsa.exists(channelId))) return console.warn(`\x1b[44m Maaf!! File ${channelId} tidak ada \x1b[0m`)
                const chnlID = await fsa.readTextFile(channelId, "utf-8")
                const channelnya = chnlID.toString().replace(/\r/g, "").split('\n')
                //console.log(channelnya)
                console.log(`\x1b[36m Total : ${channelnya.length} CHANNEL ID \x1b[0m`)
                while (true){
                    for(let i = 0; i < channelnya.length; i++) {
                        const content = randomshil()
                        const sendMessage = await Channelmessage(token, channelnya[i], content)
                        //console.log(`mengirim ke channel ID ${channelnya[i]}`)
                        if (sendMessage.id) {
                            console.log(`\x1b[32m [ ${moment().format("HH:mm:ss")} ] WORK!! mengirim ke channel ID ${channelnya[i]} | Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content} \x1b[0m`)
                            await fsa.writeTextFile(`./tmp/${token}`, sendMessage.id, "utf-8")
                            const messageId = await fsa.readTextFile(`./tmp/${token}`, "utf-8")
                            console.log(`\x1b[31m[ ${moment().format("HH:mm:ss")} ] Delay for delete messageID: ${messageId} \x1b[0m`)
                            await delay(delaychat)
                            await removeMessage(token, channelnya[i], messageId)
                            await delay(2000)
                        } else {
                            continue
                        }
                    }
                }
            } else {
                while (true) {
                    const content = randomshil()
                    const sendMessage = await Channelmessage(token, channelId, content)
                    if (sendMessage.id) {
                        console.log(`[ ${moment().format("HH:mm:ss")} ] WORK!! Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content}`)
                        await fsa.writeTextFile(`./tmp/${token}`, sendMessage.id, "utf-8")
                        const messageId = await fsa.readTextFile(`./tmp/${token}`, "utf-8")
                        console.log(`[ ${moment().format("HH:mm:ss")} ] Delay for delete messageID: ${messageId}`)
                        await delay(delaychat)
                        await removeMessage(token, channelId, messageId)
                        await delay(2000)
                    } else {
                        continue
                    }
                }
            }
        } else if (choise === "3") {
            const token = fs.readFileSync('./data/token.txt', 'utf8');
            console.log("\x1b[33m \n// Otomatis BOT (autochat only) // \x1b[0m")
            console.log(`\x1b[33m [x] Masukan ID channel atau nama file.txt \x1b[0m`)
            const channelId = readlineSync.question('\x1b[33m [x] Channel ID/file .txt : \x1b[0m');
            const delaychat = readlineSync.question('\x1b[33m [x] Masukan Delay (millisecond) : \x1b[0m');
            if (channelId.includes(".txt")) {
                if (!(await fsa.exists(channelId))) return console.warn(`\x1b[44m Maaf!! File ${channelId} tidak ada \x1b[0m`)
                const chnlID = await fsa.readTextFile(channelId, "utf-8")
                const channelnya = chnlID.toString().replace(/\r/g, "").split('\n')
                //console.log(channelnya)
                console.log(`\x1b[36m Total : ${channelnya.length} CHANNEL ID \x1b[0m`)
                while (true){
                    for(let i = 0; i < channelnya.length; i++) {
                        const content = randomshil()
                        const sendMessage = await Channelmessage(token, channelnya[i], content)
                        //console.log(`mengirim ke channel ID ${channelnya[i]}`)
                        if (sendMessage.id) {
                            console.log(`\x1b[32m [ ${moment().format("HH:mm:ss")} ] WORK!! mengirim ke channel ID ${channelnya[i]} | Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content} \x1b[0m`)
                            await delay(delaychat)
                        } else {
                            continue
                        }
                    }
                }
            } else {
                while (true) {
                    const content = randomshil()
                    const sendMessage = await Channelmessage(token, channelId, content)
                    if (sendMessage.id) {
                        console.log(`[ ${moment().format("HH:mm:ss")} ] WORK!! Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content}`)
                        await delay(delaychat)
                    } else {
                        continue
                    }
                }
            }
        } else if (choise === "4") {
            // const data = fs.readFileSync('./data/token.txt', 'utf8');
            // const token = data.toString();
            console.log(`\x1b[33m \n// Manual BOT (autochat + autodelete) // \x1b[0m`)
            console.log("\x1b[33m -> Input Token Manual <- \x1b[0m")
            const token = readlineSync.question('\x1b[33m [x] Masukan Token :  \x1b[0m');
            const channelId = readlineSync.question('\x1b[33m [x] Masukan Channel ID/file.txt : \x1b[0m');
            const delaychat = readlineSync.question('\x1b[33m [x] Masukan Delay (millisecond) : \x1b[0m');
            if (channelId.includes(".txt")) {
                if (!(await fsa.exists(channelId))) return console.warn(`\x1b[44m Maaf!! File ${channelId} tidak ada \x1b[0m`)
                const chnlID = await fsa.readTextFile(channelId, "utf-8")
                const channelnya = chnlID.toString().replace(/\r/g, "").split('\n')
                //console.log(channelnya)
                console.log(`\x1b[36m Total : ${channelnya.length} CHANNEL ID \x1b[0m`)
                while (true){
                    for(let i = 0; i < channelnya.length; i++) {
                        const content = randomshil()
                        const sendMessage = await Channelmessage(token, channelnya[i], content)
                        //console.log(`mengirim ke channel ID ${channelnya[i]}`)
                        if (sendMessage.id) {
                            console.log(`\x1b[32m [ ${moment().format("HH:mm:ss")} ] WORK!! mengirim ke channel ID ${channelnya[i]} | Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content} \x1b[0m`)
                            await fsa.writeTextFile(`./tmp/${token}`, sendMessage.id, "utf-8")
                            const messageId = await fsa.readTextFile(`./tmp/${token}`, "utf-8")
                            console.log(`\x1b[31m [ ${moment().format("HH:mm:ss")} ] Delay for delete messageID: ${messageId} \x1b[0m`)
                            await delay(delaychat)
                            await removeMessage(token, channelnya[i], messageId)
                            await delay(2000)
                        } else {
                            continue
                        }
                    }
                }
            } else {
                while (true) {
                    const content = randomshil()
                    const sendMessage = await Channelmessage(token, channelId, content)
                    if (sendMessage.id) {
                        console.log(`[ ${moment().format("HH:mm:ss")} ] WORK!! Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content}`)
                        await fsa.writeTextFile(`./tmp/${token}`, sendMessage.id, "utf-8")
                        const messageId = await fsa.readTextFile(`./tmp/${token}`, "utf-8")
                        console.log(`[ ${moment().format("HH:mm:ss")} ] Delay for delete messageID: ${messageId}`)
                        await delay(delaychat)
                        await removeMessage(token, channelId, messageId)
                        await delay(2000)
                    } else {
                        continue
                    }
                }
            }
        } else if (choise === "5") {
            // const data = fs.readFileSync('./data/token.txt', 'utf8');
            // const token = data.toString();
            console.log(`\x1b[33m \n// Manual BOT (autochat only) // \x1b[0m`)
            console.log("\x1b[33m -> Input Token Manual <-\x1b[0m")
            const token = readlineSync.question('\x1b[33m [x] Masukan Token : \x1b[0m');
            const channelId = readlineSync.question('\x1b[33m [x] Masukan Channel ID/file.txt : \x1b[0m');
            const delaychat = readlineSync.question('\x1b[33m [x] Masukan Delay (millisecond) : \x1b[0m');
            if (channelId.includes(".txt")) {
                if (!(await fsa.exists(channelId))) return console.warn(`\x1b[44m Maaf!! File ${channelId} tidak ada\x1b[0m`)
                const chnlID = await fsa.readTextFile(channelId, "utf-8")
                const channelnya = chnlID.toString().replace(/\r/g, "").split('\n')
                //console.log(channelnya)
                console.log(`\x1b[36m Total : ${channelnya.length} CHANNEL ID \x1b[0m`)
                while (true){
                    for(let i = 0; i < channelnya.length; i++) {
                        const content = randomshil()
                        const sendMessage = await Channelmessage(token, channelnya[i], content)
                        //console.log(`mengirim ke channel ID ${channelnya[i]}`)
                        if (sendMessage.id) {
                            console.log(`\x1b[32m [ ${moment().format("HH:mm:ss")} ] WORK!! mengirim ke channel ID ${channelnya[i]} | Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content} \x1b[0m`)
                            await delay(delaychat)
                        } else {
                            continue
                        }
                    }
                }
            } else {
                while (true) {
                    const content = randomshil()
                    const sendMessage = await Channelmessage(token, channelId, content)
                    if (sendMessage.id) {
                        console.log(`[ ${moment().format("HH:mm:ss")} ] WORK!! Message ID : ${sendMessage.id} | Content Message: ${sendMessage.content}`)
                        await delay(delaychat)
                    } else {
                        continue
                    }
                }
            }
        } else {
            process.exit();
        } 
    } catch (err) {
        console.log(err)
    }
})();
export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send('Method not allowed');
        return;
    }

    if (req.body === 'ping') {
        console.log(req);
        res.status(200).send('pong');
        return;
    }
    
    res.status(200).send('')
    return;
}
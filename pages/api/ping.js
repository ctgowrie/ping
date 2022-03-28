export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send('Method not allowed');
        return;
    }

    const body = req.body;
    if (body.value === 'ping') {
        console.log(body);
        res.status(200).send({value: 'pong'});
        return;
    }
    if (body.value === 'pong') {
        console.log(body);
        res.status(200).send({value: 'ping'});
        return;
    }
    
    res.status(200).send({value: ''})
    return;
}
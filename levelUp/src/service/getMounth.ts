export function printLastSixMonths() {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let res=[]
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    for (let i = 0; i < 7; i++) {
        const monthIndex = (currentMonth - i + 12) % 12;
        console.log(`${months[monthIndex]} `);
        res.push(`${months[monthIndex]} `);
    }
    return res.reverse()
}
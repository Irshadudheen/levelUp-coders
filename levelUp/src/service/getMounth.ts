export function printLastSixMonths() {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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
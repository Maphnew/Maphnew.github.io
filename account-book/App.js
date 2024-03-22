export default function App() {
   
    const datepicker = document.querySelector('#datepicker')
    const dateVal = datepicker.value
    
    const now = new Date()
    
    if(!dateVal) {
        const today = now.getFullYear() + '-' + leftFullNum(now.getMonth()+1, 2) + '-' + leftFullNum(now.getDate(), 2)
        datepicker.value = today
    }
    
    function leftFullNum(num, targetLength) {
        return num.toString().padStart(targetLength, "0")
    }
    
    datepicker.addEventListener('change', function(e) {
        const pickedDate = new Date(e.target.value)
        const day = pickedDate.getDay()
        whatday.value = dayNames[day]
    })
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = now.getDay()
    const whatday = document.querySelector('#whatday')
    whatday.value = dayNames[day]
}
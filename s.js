
let activities = []

document.addEventListener('DOMContentLoaded', () => {
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(data => {
activities = data.map(item => ({ id: item.id, body: item.title }))
renderActivities()
})
.catch(error => {
console.error('خطأ في جلب البيانات:', error)
})
})

function renderActivities() {
const tbody = document.querySelector('#activities-table tbody')
tbody.innerHTML = ''
activities.forEach(activity => {
const tr = document.createElement('tr')
tr.innerHTML = `
<td>${activity.id}</td>
<td>${activity.body}</td>
<td>
<button class="update-btn" onclick="editActivity(${activity.id})">تعديل</button>
<button class="delete-btn" onclick="deleteActivity(${activity.id})">حذف</button>
</td>
`
tbody.appendChild(tr)
})
}

function addActivity() {
const textarea = document.getElementById('new-activity')
const newActivityText = textarea.value.trim()
if (!newActivityText) {
alert("من فضلك أدخل نص النشاط!")
return
}
const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1
activities.push({
id: newId,
body: newActivityText
})
textarea.value = ''
renderActivities()
}

function deleteActivity(id) {
activities = activities.filter(activity => activity.id !== id)
renderActivities()
}

function editActivity(id) {
const currentText = activities.find(a => a.id === id).body
const newText = prompt("عدّل النص:", currentText)
if (newText && newText.trim() !== "") {
activities.find(a => a.id === id).body = newText.trim()
renderActivities()
}
}

function openModal() {
document.getElementById('modal').style.display = 'flex'
}

function closeModal() {
document.getElementById('modal').style.display = 'none'
}

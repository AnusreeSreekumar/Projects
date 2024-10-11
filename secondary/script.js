
function addTopics(topic) {

    console.log(topic)

    let primarr = ['Basic Maths', 'Science', 'English Grammar', 'Social Studies', 'General Knowledge for Kids']

    let secndryarr = ['Mathematics (Algebra, Geometry)', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Computer Science']

    if (topic == 'primary') {

        for (let i = 0; i < primarr.length; i++) {

            // Create a container div for each checkbox and label
            let container = document.createElement('div');
            container.classList.add('chkbox-container');

            // Create the checkbox
            let chkbx = document.createElement('input');
            chkbx.type = 'checkbox';
            chkbx.classList.add('chkbox-style');

            // Create the label
            let label = document.createElement('label');
            label.textContent = primarr[i];
            label.classList.add('labltxt-style');

            // Append the checkbox and label to the container
            container.appendChild(chkbx);
            container.appendChild(label)

            // Append the container to the 'topics' div
            document.getElementById('topics').appendChild(container);
        }
    }
    else if(topic == 'secondary'){

        for (let i = 0; i < secndryarr.length; i++) {

            // Create a container div for each checkbox and label
            let container = document.createElement('div');
            container.classList.add('chkbox-container');

            // Create the checkbox
            let chkbx = document.createElement('input');
            chkbx.type = 'checkbox';
            chkbx.classList.add('chkbox-style');

            // Create the label
            let label = document.createElement('label');
            label.textContent = secndryarr[i];
            label.classList.add('labltxt-style');

            // Append the checkbox and label to the container
            container.appendChild(chkbx);
            container.appendChild(label)

            // Append the container to the 'topics' div
            document.getElementById('topics').appendChild(container);
        }
    }
    // else
}
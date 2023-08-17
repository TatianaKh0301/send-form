"use strict"

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        // formData.append()

        if (error === 0) {
            // form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                // form.classList.remove('_sending');
            } else {
                alert("Error JavaScript");
            }
        } else {
            alert('Please, fill in required fields');
            // form.classList.remove('_sending');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)){
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    // const formImage = document.getElementById('formImage');
    // const formPreview = document.getElementById('formPreview');

    // formImage.addEventListener('change', () => {
    //     uploadFile(formImage.files[0]);
    // });

    // function uploadFile(file) {
        // ------------------check type of file----------------------
        // if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        //     alert('You can choose only images');
        //     formImage.value = '';
        //     return;
        // }

        // -------------------check size of file ------------------------
    //     if (file.size > 2 * 1024 * 1024) {
    //         alert('File should be less than 2MB');
    //         return;
    //     }

    //     var reader = new FileReader();
    //     reader.onload = function (e) {
    //         form.Preview.innerHTML = `img src="${e.target.result}" alt="photo"`;
    //     };
    //     reader.onerror = function (e) {
    //         alert("Error");
    //     };
    //     reader.readAsDataURL(file);


    // }
});
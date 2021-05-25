;(function ($) {
  var form = $('#signup-form')
  form.validate({
    errorPlacement: function errorPlacement(error, element) {
      element.before(error)
    },
    rules: {
      email: {
        email: true,
      },
    },
    onfocusout: function (element) {
      $(element).valid()
    },
  })
  form.children('div').steps({
    headerTag: 'h3',
    bodyTag: 'fieldset',
    transitionEffect: 'fade',
    stepsOrientation: 'vertical',
    titleTemplate:
      '<div class="title"><span class="step-number">#index#</span><span class="step-text">#title#</span></div>',
    labels: {
      previous: 'Previous',
      next: 'Next',
      finish: 'Finish',
      current: '',
    },
    onStepChanging: function (event, currentIndex, newIndex) {
      if (currentIndex === 0) {
        form
          .parent()
          .parent()
          .parent()
          .append('<div class="footer footer-' + currentIndex + '"></div>')
      }
      if (currentIndex === 1) {
        form
          .parent()
          .parent()
          .parent()
          .find('.footer')
          .removeClass('footer-0')
          .addClass('footer-' + currentIndex + '')
      }
      if (currentIndex === 2) {
        form
          .parent()
          .parent()
          .parent()
          .find('.footer')
          .removeClass('footer-1')
          .addClass('footer-' + currentIndex + '')
      }
      if (currentIndex === 3) {
        form
          .parent()
          .parent()
          .parent()
          .find('.footer')
          .removeClass('footer-2')
          .addClass('footer-' + currentIndex + '')
      }

      // if(currentIndex === 4) {
      //     form.parent().parent().parent().append('<div class="footer" style="height:752px;"></div>');
      // }
      form.validate().settings.ignore = ':disabled,:hidden'
      return form.valid()
    },
    onFinishing: function (event, currentIndex) {
      form.validate().settings.ignore = ':disabled'
      return form.valid()
    },
    onFinished: function (event, currentIndex) {
      alert('Submited')
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
      return true
    },
  })

  jQuery.extend(jQuery.validator.messages, {
    required: '',
    remote: '',
    email: '',
    url: '',
    date: '',
    dateISO: '',
    number: '',
    digits: '',
    creditcard: '',
    equalTo: '',
  })

  $.dobPicker({
    daySelector: '#birth_date',
    monthSelector: '#birth_month',
    yearSelector: '#birth_year',
    dayDefault: '',
    monthDefault: '',
    yearDefault: '',
    minimumAge: 0,
    maximumAge: 120,
  })
  var marginSlider = document.getElementById('slider-margin')
  if (marginSlider != undefined) {
    noUiSlider.create(marginSlider, {
      start: [1100],
      step: 100,
      connect: [true, false],
      tooltips: [true],
      range: {
        min: 100,
        max: 2000,
      },
      pips: {
        mode: 'values',
        values: [100, 2000],
        density: 4,
      },
      format: wNumb({
        decimals: 0,
        thousand: '',
        prefix: '$ ',
      }),
    })
    var marginMin = document.getElementById('value-lower'),
      marginMax = document.getElementById('value-upper')

    marginSlider.noUiSlider.on('update', function (values, handle) {
      if (handle) {
        marginMax.innerHTML = values[handle]
      } else {
        marginMin.innerHTML = values[handle]
      }
    })
  }
})(jQuery)

// document.querySelector("#imgfile").addEventListener("change", function(){
//     // console.log(this.files);
//     const reader=new  FileReader();
//     reader.addEventListener("Load",()=>{

//         localStorage.setItem( "recent-image",reader.result)
//     })
//     reader.readAsDataURL(this.files[0]);

// });

var x, i, j, l, ll, selElmnt, a, b, c
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName('custom-select')
l = x.length
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName('select')[0]
  ll = selElmnt.length
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement('DIV')
  a.setAttribute('class', 'select-selected')
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
  x[i].appendChild(a)
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement('DIV')
  b.setAttribute('class', 'select-items select-hide')
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement('DIV')
    c.innerHTML = selElmnt.options[j].innerHTML
    c.addEventListener('click', function (e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      var y, i, k, s, h, sl, yl
      s = this.parentNode.parentNode.getElementsByTagName('select')[0]
      sl = s.length
      h = this.parentNode.previousSibling
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i
          h.innerHTML = this.innerHTML
          y = this.parentNode.getElementsByClassName('same-as-selected')
          yl = y.length
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute('class')
          }
          this.setAttribute('class', 'same-as-selected')
          break
        }
      }
      h.click()
    })
    b.appendChild(c)
  }
  x[i].appendChild(b)
  a.addEventListener('click', function (e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation()
    closeAllSelect(this)
    this.nextSibling.classList.toggle('select-hide')
    this.classList.toggle('select-arrow-active')
  })
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = []
  x = document.getElementsByClassName('select-items')
  y = document.getElementsByClassName('select-selected')
  xl = x.length
  yl = y.length
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove('select-arrow-active')
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide')
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener('click', closeAllSelect)

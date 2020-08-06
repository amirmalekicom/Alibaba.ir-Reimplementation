let focusCity = (cityName) => $('#'+cityName).addClass('badge--orange');

let changeSelectedCity = (newSelectedCityName) => {
    if(typeof(selectedCity) != 'undefined')
       $('#'+selectedCity).removeClass('badge--orange');
    selectedCity = newSelectedCityName;
}


function addHotel(name, stars, price, image, rate_number, rate_desc) {
    // StackOverflow: Best way to create nested HTML elements with jQuery
    $.extend({
    addEl: function(el, props) {
            var $el = $(document.createElement(el));
            if(typeof(props) !== 'undefined') {
                $el.attr(props);
            }
            return $el;
        }
    });
    
    $('#hotels').append(
        $.addEl('div', {'class': 'col-xs-12 col-sm-6 col-md-4'}).append(
            $.addEl('div', {'class': 'c-popular-hotel-card'}).append(
                $.addEl('a', {'href': 'TODO', 'target': '_blank', 'rel': 'nofollow'}).append(
                    $.addEl('div', {'class': 'card-image', 'style': 'background-image: url(' + image + ');'}).append(
                        function () {
                            if (rate_number >= 0) {
                                return $.addEl('div', {'class': 'card-overlay'}).append(
                                    $.addEl('div', {'class': 'card-rate'}).append(
                                        $.addEl('div', {'class': 'rate-number font-16'}).text(rate_number)
                                    ).append(
                                        $.addEl('div', {'class': 'rate-text font-10'}).text(rate_desc)
                                    )
                                )
                            }
                        }
                    )
                ).append(
                    $.addEl('div', {'class': 'card-content'}).append(
                        $.addEl('div', {'class': 'flex flex-justify-space-between flex-align-center rtl font-en'}).append(
                            $.addEl('p', {'class': 'text-ellipsis text-darker w-500 font-16 m-0'}).text(name)
                        ).append(
                            $.addEl('div', {'class': 'rate-stars'}).append(
                                function() {
                                    var allStars = new Array(5);
                                    for(i = 0; i < 5; i++) {
                                        if(i<stars)
                                            allStars[i] = $.addEl('i', {'class': 'icon-star-rate active'})
                                        else
                                            allStars[i] = $.addEl('i', {'class': 'icon-star-rate'})
                                    }
                                    return allStars
                                }
                            )
                        )
                    ).append(
                        $.addEl('hr', {'class': 'mt-2'})
                    ).append(
                        $.addEl('div', {'class': 'flex flex-justify-space-between flex-align-center'}).append(
                            $.addEl('div').append(
                                $.addEl('div', {'class': 'text-gray w-normal'}).text('شروع قیمت از')
                            ).append(
                                $.addEl('strong', {'class': 'text-blue'}).text(function() {
                                    // separator
                                    var separatedPrice = '';
                                    while(price > 999) {
                                        separatedPrice = ',' + ('00'+(price % 1000)).slice(-3) + separatedPrice;    
                                        price = Math.floor(price / 1000);
                                    }
                                    separatedPrice = price + separatedPrice;
                                    return separatedPrice;
                                }.apply() + ' ريال')
                            )
                        ).append(
                            $.addEl('button', {'class': 'btn btn-primary content-btn mt-3'}).text('مشاهده و رزرو')
                        )
                    )
                )
            )
        )
    );
}

function fetchHotels(cityName) {
    let ajaxReq = new XMLHttpRequest();
    
    ajaxReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let hotels = JSON.parse(ajaxReq.responseText);
            console.log(hotels);
            for(iHotel = 0; iHotel < hotels.length; iHotel++) {
                addHotel(hotels[iHotel].name, hotels[iHotel].stars, hotels[iHotel].price, hotels[iHotel].image, hotels[iHotel].rate_number, hotels[iHotel].rate_desc);
            }
            
        }
    }
    
    ajaxReq.open('GET', 'http://37.152.185.50:8080/hotels/'+cityName);
    ajaxReq.send();
}

$('.badge').click(function() {
    let clickedCity = $(this).attr('id');
    focusCity(clickedCity);
    changeSelectedCity(clickedCity);
    $('#hotels').html('');
    fetchHotels(clickedCity);
});

// simulate istanbul click at page start
$('#istanbul').trigger('click');
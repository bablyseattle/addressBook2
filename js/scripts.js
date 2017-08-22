function Contact (first,last){
	this.firstName = first;
	this.lastName = last;
  this.addresses = [];
}
Contact.prototype.fullname = function(){
	return this.firstName+" "+this.lastName;
}
// function Address(type, street, city, state){
//   this.type =type;
//   this.street = street;
//   this.city = city;
//   this.state = state;
// }
//user interface logic
$(document).ready(function() {
  $("button#add-address").click(function() {
    $(".addressInfo").append(  '<div class="new-address">'+
                                '<div class="form-group"'+
                                 '<label for="sel1">Type:</label>'+
                                 '<select class="form-control" id="sel1">'+
                                   '<option selected>Home</option>'+
                                   '<option>Office</option>'+
                                   '<option>Billing</option>'+
                                 '</select>'+
                               '</div>'+
                               '<div class="form-group">'+
                               '<label for="street">Street:</label>'+
                               '<input type="text" class="form-control" id="new-street">'+
                             '</div>'+
                             '<div class="form-group">'+
                               '<label for="city">City:</label>'+
                               '<input type="text" class="form-control" id="new-city">'+
                             '</div>'+
                             '<div class="form-group">'+
                               '<label for="state">State:</label>'+
                               '<input type="text" class="form-control" id="new-state">'+
                             '</div>'+
                           '</div>');
    });
  $("button#add-address").trigger("click");
  $("form#new-contact").submit(function(event) {
    var arr = [];
    event.preventDefault();
    $("input.name").each(function(){
      arr[this.id] = $(this).val();
    });
    var newContact = new Contact(arr['new-first-name'], arr['new-last-name']);
    $('.new-address').each(function() {
       var type = $(this).find('#sel1').val();
       var street = $(this).find('#new-street').val();
       var city = $(this).find('#new-city').val();
       var state = $(this).find('#new-state').val();
       var typeAddress = {type: type, addr:[street, city, state]};
      newContact.addresses.push(typeAddress)
    })
    $("ul#contacts").append("<li><span class='contact'>" + newContact.firstName + "</span></li>");
    $(".contact").last().click(function() {
        $("#show-contact").show();
        $("#show-contact h2").text(newContact.firstName);
        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);
        newContact.addresses.forEach(function(address) {
            if(address.type){
              $('.address-detail').append('<p>Address Type: <span class="address-type">'+address.type+'</span></p>');
              $('.address-detail').append('<span class="fullAddress">'+address.addr[0]+", "+address.addr[1]+", "+address.addr[2]+'</span>');
            }
        })
    });
  });
});

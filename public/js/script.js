$(document).ready(function () {
    $(document).on('click', '.btndeletetr', function () {
        var id = $(this).attr('data-id')
        var This = $(this)
        $.ajax({
            type: "post",
            url: "/admin/delete?id=" + id,
            async: true,
            success: function (data) {
                This.parents('tr').remove()
            }
        });
    })
    $('.loginli').on('click', function () {
        $('form.denglu').show()
        $('form.zhuce').hide()
        $('.boxlogin,.boxinner').fadeIn()
    })
    $('.singupli').on('click', function () {
        $('form.zhuce').show()
        $('form.denglu').hide()
        $('.boxlogin,.boxinner').fadeIn()
    })
    $('.boxlogin').click(function (e) {
        console.log($(e.target).find('form').length == 2)
        if ($(e.target).find('form').length == 2) {
            $('.boxlogin').fadeOut()
        }
    })
})
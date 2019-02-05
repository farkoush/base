@php
    $class = 'mdc-text-field';
    if(isset($outlined)) $class .= ' mdc-text-field--outlined';
    if(isset($shaped)) $class .= ' shaped';
    if(isset($icon)) $class .= isset($icon_type)? ' mdc-text-field--with-trailing-icon': ' mdc-text-field--with-leading-icon';
@endphp

<div class="{{$class}}"  data-mdc-auto-init="mdc-text-field">
    @isset($icon)
        <i class="material-icons mdc-text-field__icon" role="button" data-mdc-auto-init="mdc-text-field-icon">{{$icon}}</i>
    @endisset
    <input type="text" id="tf-outlined" class="mdc-text-field__input">
    @isset($outlined)
        <div class="mdc-notched-outline">
            <div class="mdc-notched-outline__leading"></div>
            <div class="mdc-notched-outline__notch">
            <label for="tf-outlined" class="mdc-floating-label">{{$label ?? ''}}</label>
            </div>
            <div class="mdc-notched-outline__trailing"></div>
        </div>    
    @else
        <label class="mdc-floating-label" for="my-text-field">{{$label ?? ''}}</label>
        <div class="mdc-line-ripple"></div>
    @endisset
</div>
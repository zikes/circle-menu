Circle Menu
===========

A highly customizable jQuery plugin that emulates the menu in the [Path][] application.  Includes a 
selection animation and various animation options for opening and closing the menu.

**[See it in action.][demo]**

**Compatibility:**

Fully Working:

* Chrome
* Firefox

Known Issues:

* IE 9 
  * Does not include CSS animations for open/close.
* Opera
  * Open animations not working, but close animations work.

[Path]: https://path.com/
[demo]: http://zikes.github.com/circle-menu/

How to Use
----------

Create a list, with the first list item representing the icon at the center of the menu.

    <ul>
      <li><a href="#">+</a></li>
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
    </ul>

The Javascript:

    $('ul').circleMenu({
        item_diameter: 40,
        circle_radius: 100,
        direction: 'bottom-right'
    });

Options
-------

### direction

**Options:** `top` | `right` | `bottom` | `left` | `top-right` | `top-left` | `bottom-right` | `bottom-left` | 
`top-half` | `right-half` | `bottom-half` | `left-half` | `full`

The direction of the items in relation to the center.  `top` will place the items above the center, 
in a 90 degree semicircle centered upwards.  `top-half` will create a full 180 degree semicircle.
`full` will create a full 360 degree circle, with the first item appearing at the top.

Default: _none_

**Example:**

    $('ul').circleMenu({direction:'bottom-right'});

### angle

An object specifying the position of the items in relation to the center, measured in degrees where 
0 and 360 are on the right.  An alternative to the `direction` option, if you want more control.

Default: `{start: 0, end: 90}`

**Example:**

    $('ul').circleMenu({angle:{start:260, end:280}});

### item_diameter

The diameter of each item, in pixels.  Used to set the CSS properties of each item including width,
height, and border-radius.

Default: `30`

**Example:**

    $('ul').circleMenu({item_diameter:30});

### circle_radius

The radius of the circle that determines the distance of the items from the center.

Default: `80`

**Example:**

    $('ul').circleMenu({circle_radius:80});

### speed

The animation speed, in milliseconds.  The number given is the total amount of time it will take for
the items to move in or out from the center.

Default: `500`

**Example:**

    $('ul').circleMenu({speed:1000});

### delay

When the menu is triggered on hover, the delay is the amount of time before the items will move back
in to the center, meaured in milliseconds.

Default: `1000`

**Example:**

    $('ul').circleMenu({delay:500}); // a short delay

### step_out

The number of milliseconds between each item moving out from the center when the menu opens.  A
negative value will cause the menu to open in reverse, starting with the last item.

Default: `20`

**Example:**

    $('ul').circleMenu({step_out:60});

### step_in

The number of milliseconds between each item moving in to the center when the menu closes.  A
negative value will cause the menu to close in reverse, starting with the last item.

Default: `-20`

**Example:**

    $('ul').circleMenu({step_in:60});

### trigger

`hover` | `click`

How the menu is triggered to open and close, whether by hovering over the center item or clicking 
on it.

Default: `hover`

**Example:**

    $('ul').circleMenu({trigger:'click'});

### animation-timing-function

`ease` | `linear` | `ease-in` | `ease-out` | `ease-in-out` | `cubic-bezier(n,n,n,n)`

The CSS timing function used to control the open/close animation.

Default: `ease`

**Example:**

    $('ul').circleMenu({'animation-timing-function':'linear'});
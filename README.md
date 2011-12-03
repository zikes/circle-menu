Circle Menu
===========

A jQuery plugin that emulates the menu in the [Path][] application.

**[See it in action.][demo]**


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

    $('ul').circleMenu();

Options
-------

### direction

`top` | `right` | `bottom` | `left` | `top-right` | `top-left` | `bottom-right` | `bottom-left` | 
`top-half` | `right-half` | `bottom-half` | `left-half` | `full`
The direction of the items in relation to the center.  `top` will place the items above the center, 
in a 90 degree semicircle centered upwards.  `top-half` will create a full 180 degree semicircle.
`full` will create a full 360 degree circle, with the first item appearing at the top.

Default: _none_

**Example:**

    $('ul').circleMenu({direction:'bottom-right'});

### angle

`{start: 0, end: 90}`
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
# Stimulus Mask

This is a mask for stimulus (v 0.1)

## How to add to your project

Copy and paste `mask-controller.js`

Add the code bellow to your `app/javascript/controllers/index.js`
```
import MaskController from "./mask_controller"
application.register("mask", MaskController)
```

## How to use

Example of usage:
```
<input data-controller="mask" data-mask-pattern="[000-AAA/XX]">
```
Each character on pattern represents a character from the typing

- 0 translate to any number
- A translate to any letter
- X translate to any character
- S translate to space

Examples

- typed: `1234` with pattern `000` the result will be: `123`
- typed: `123` with pattern `00-0` the result will be: `12-3`
- typed: `Abc1` with pattern `AAA1` the result will be: `Abc1`
- typed: `1ab2` with pattern `XX` the result will be: `1a`

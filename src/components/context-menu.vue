<template>
    <section id="context-menu">
        <div>
            <div class="item"><i class="fas fa-external-link-alt"></i> Open in new Tab</div>
            <hr />

            <div class="item"><i class="far fa-edit"></i> Rename</div>
            <div class="item"><i class="far fa-copy"></i> Duplicate board</div>
            <div class="item"><i class="far fa-trash-alt"></i> Delete</div>
        </div>
    </section>
</template>

<script>
export default {};
</script>

<style>
section#context-menu {
    position: fixed;
    z-index: 10;
    width: 150px;
    background-color: #c4c4c4;
    transform: scale(0);
    transform-origin: top left;
}

section#context-menu.active {
    transform: scale(1);
    transition: transform 0.2s ease-in-out;
}

#context-menu div .item {
    padding: 8px 10px;
    font-size: 15px;
    color: #242424;
}

#context-menu div .item:hover {
    background-color: #555;
}

#context-menu div .item i {
    display: inline-block;
    margin-right: 5px;
}

#context-menu div hr {
    margin: 2px 0;
    border-color: #555;
}
</style>

# export-models.py  – Blender 4.4 friendly
import bpy, sys, argparse

def cli():
    argv = sys.argv[sys.argv.index("--")+1:] if "--" in sys.argv else []
    p = argparse.ArgumentParser()
    p.add_argument("--out", required=True, help="output .glb/.gltf")
    p.add_argument("--format", default="GLB",
                   choices=["GLB", "GLTF_EMBEDDED", "GLTF_SEPARATE"])
    p.add_argument("--selected", action="store_true", help="only export the current selection")
    return p.parse_args(argv)

args = cli()

if not args.selected:
    bpy.ops.object.select_all(action='SELECT')

bpy.ops.export_scene.gltf(
    filepath=args.out,
    export_format=args.format,
    use_selection=args.selected,        # ← renamed
    export_apply=True,
    export_texcoords=True,
    export_normals=True,
    export_tangents=True,
    export_vertex_color='MATERIAL',     # ← enum, not bool
    export_materials='EXPORT',
    export_yup=True,
    export_cameras=False,
    export_lights=False,
    export_extras=True,
)

print(f"✔ Wrote {args.out}")

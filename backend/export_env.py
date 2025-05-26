def create_env_script(env_filename='.env', sh_filename='export_env.sh'):
    try:
        with open(env_filename, 'r') as env_file:
            lines = env_file.readlines()

        with open(sh_filename, 'w') as sh_file:
            sh_file.write("#!/bin/bash\n\n")
            for line in lines:
                if line.strip() and not line.startswith('#'):
                    sh_file.write(f'export {line.strip()}\n')

        print(f"Le fichier {sh_filename} a été créé avec succès à partir de {env_filename}.")
    except FileNotFoundError:
        print(f"Le fichier {env_filename} n'a pas été trouvé.")
    except Exception as e:
        print(f"Une erreur est survenue : {e}")

if __name__ == '__main__':
    create_env_script()
import os

def main():
    # Step 1: Hardcoded base folder path
    base_folder = r"../"  # Change this to your desired hardcoded folder

    # Step 2: List of ignored project folders
    ignored_projects = {".git", "script"}  # Add folder names to ignore

    # Step 3: List directories in the base folder, excluding ignored projects
    print("Available project folders:")
    subfolders = [
        f for f in os.listdir(base_folder)
        if os.path.isdir(os.path.join(base_folder, f)) and f not in ignored_projects
    ]

    if not subfolders:
        print("No available project folders found.")
        return

    for idx, folder in enumerate(subfolders, 1):
        print(f"{idx}: {folder}")

    # Step 4: Allow user to select a project folder
    choice = input("Enter the number corresponding to the project folder: ")
    try:
        selected_folder = subfolders[int(choice) - 1]
    except (IndexError, ValueError):
        print("Invalid choice. Exiting.")
        return

    # Full path to the selected folder
    project_folder = os.path.join(base_folder, selected_folder)

    # Step 5: File extensions to look for
    file_extensions = ['.json', '.html', '.js', '.css']

    # Step 6: Find matching files and write to txt file
    output_file = os.path.join(project_folder, "file_list.txt")

    with open(output_file, "w", encoding="utf-8") as f:
        for root, _, files in os.walk(project_folder):
            for file in files:
                if any(file.endswith(ext) for ext in file_extensions):
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, project_folder)
                    f.write(f"File: {rel_path}\n")
                    
                    try:
                        # Write file content
                        with open(file_path, "r", encoding="utf-8") as file_content:
                            content = file_content.read()
                        f.write(f"Content:\n{content}\n\n")
                    except Exception as e:
                        # Handle cases where files can't be read
                        f.write(f"Could not read file content: {e}\n\n")

    print(f"File list with content saved to: {output_file}")

if __name__ == "__main__":
    main()

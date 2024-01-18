import bibtexparser

def create_tex_file(file_path, content):
    with open(file_path, 'w') as tex_file:
        tex_file.write(content)
        
def modify_author_name(authors):
    # Reemplazar tu nombre con el nuevo formato deseado
    if "Ruiz-Cigarrillo, O." in authors:
        my_name_modified = r"{\color{VioletRed}O. Ruiz-Cigarrillo}"
        modified_authors = authors.replace("Ruiz-Cigarrillo, O.", my_name_modified)
    elif 'Ruiz-Cigarrillo, Oscar' in authors:
         my_name_modified = r"{\color{VioletRed}Oscar Ruiz-Cigarrillo}"
         modified_authors = authors.replace('Ruiz-Cigarrillo, Oscar', my_name_modified)
    return modified_authors
    
def extract_publications(bib_file):
    tex_content = ""
    with open(bib_file, 'r') as bibfile:
        bib_database = bibtexparser.load(bibfile)
    
        for entry in bib_database.entries:
            if 'title' in entry:
                title = entry['title']
            else:
                title = ''
            
            if 'author' in entry:
                authors = entry['author']
                # authors = modify_author_name(authors)
                # authors = ''.join(authors.split('and'))
                authors = modify_author_name(authors) 
                new_authors = " "
                for i in authors.split('and'):      
                    nauthor = ''.join(i.split(',')[::-1])
                    new_authors+=nauthor+","
                authors = new_authors
                authors =','.join(authors.split(',')[:-1])
                
            else:
                authors = ''
            
            if 'journal' in entry:
                journal = entry['journal']
            else:
                journal = ''
            
            if 'volume' in entry:
                volume = entry['volume']
            else:
                volume = ''
            if 'number' in entry :
                number = entry['number']
            else:
                number = ''
            
            if 'pages' in entry:
                pages = entry['pages']
            else:
                pages = ''
            
            if 'year' in entry:
                year = entry['year']
            else:
                year = ''
                
            if not number:
                pub = f"\\twentyitemshort{{{year}}}{{{{\\color{{blue}}{title}}} \\\ {authors}.\\\ \\textit{{{journal}}}, \\textbf{{{volume}, {pages}, {year}}}. \\\}}\n"
            else:
                pub = f"\\twentyitemshort{{{year}}}{{{{\\color{{blue}}{title}}} \\\ {authors}.\\\ \\textit{{{journal}}}, \\textbf{{{volume}({number}), {pages}, {year}}}. \\\}}\n"
            print(pub)
            tex_content += pub
        return tex_content        

if __name__ == "__main__":
    bib_file = '../data/ruco-papers.bib'  
    tex_content = extract_publications(bib_file)
    tex_file_path = '../data/publications_list.tex'
    create_tex_file(tex_file_path, tex_content)



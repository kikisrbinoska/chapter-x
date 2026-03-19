using ChapterX.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChapterX.Domain.Entities
{
    public class Genre : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public ICollection<HasGenre> HasGenres { get; set; } = [];
    }
}

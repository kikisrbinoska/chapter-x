using ChapterX.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChapterX.Domain.Entities
{
    public class User : IEntity
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Admin? Admin { get; set; }
        public RegularUser? RegularUser { get; set; }
        public Writer? Writer { get; set; }
        public ICollection<ReadingList> ReadingLists { get; set; } = [];
        public ICollection<Likes> Likes { get; set; } = [];
        public ICollection<Comment> Comments { get; set; } = [];
        public ICollection<Collaboration> Collaborations { get; set; } = [];
        public ICollection<Notify> Notifies { get; set; } = [];



    }
}

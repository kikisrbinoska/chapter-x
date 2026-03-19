using ChapterX.Domain.Entities;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChapterX.Infrastructure.Repositories
{
    public class LikesRepository : GenericRepository<Likes>, ILikesRepository
    {
        public LikesRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}

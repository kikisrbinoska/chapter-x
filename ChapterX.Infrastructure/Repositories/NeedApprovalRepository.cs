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
    public class NeedApprovalRepository : GenericRepository<NeedApproval>, INeedApprovalRepository
    {
        public NeedApprovalRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}

using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Admin.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IAdminRepository _adminRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IAdminRepository adminRepository, ILogger<GetAllHandler> logger)
        {
            _adminRepository = adminRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var admins = await _adminRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(admins);
        }
    }
}

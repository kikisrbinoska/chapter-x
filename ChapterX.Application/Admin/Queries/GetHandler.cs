using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Admin.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IAdminRepository _adminRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IAdminRepository adminRepository, ILogger<GetHandler> logger)
        {
            _adminRepository = adminRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var admin = await _adminRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(admin);
        }
    }
}

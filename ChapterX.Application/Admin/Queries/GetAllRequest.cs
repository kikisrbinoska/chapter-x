using MediatR;

namespace ChapterX.Application.Admin.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
